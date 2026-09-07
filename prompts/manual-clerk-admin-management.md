# Implementation Prompt: Manual Clerk Admin Management

## 1. Goal
Enable reliable, manual administrator management directly via the Clerk Dashboard. When an administrator role is added (`{"role": "admin"}`) or removed (cleared to `{}`) in Clerk's **Public Metadata**, the marketplace will immediately reflect the change on page refresh without session token delays and without any background code overwriting or reverting manual decisions.

---

## 2. Skills Read
- `AGENTS.md` (sections 1, 2, 4, 5, 6, 7, 12, 13): Server/client boundaries, private Clerk secret key on server, no client-side direct writes, strict authorization checks on private routes.

---

## 3. Code Inspected
- `lib/auth/admin.ts`:
  - Identified the root cause: an automatic synchronization block was calling `clerk.users.updateUserMetadata(user.id, { publicMetadata: { role: 'admin' } })` whenever an email matched `ADMIN_EMAILS` or the hardcoded default fallback (`emmanuelopokunyame@gmail.com`). When a user manually removed an admin in Clerk, visiting the app immediately restored `role: 'admin'` back into Clerk.
  - Also identified that `currentUser()` in Next.js reads from the active session token rather than fetching the live user from Clerk's database, causing manual Clerk updates to lag until token expiration or logout.
- `app/api/admin/check/route.ts`:
  - Dynamic API route that checks admin access for the client.
- `components/navigation/public-header.tsx`:
  - Cached `user?.publicMetadata?.role === 'admin'` from the client session and skipped calling `/api/admin/check`, preventing revoked admin roles from disappearing from the navbar until full sign-out.
- `app/admin/page.tsx`:
  - Skipped calling `/api/admin/check` if `userIsAdminRole` was true in the stale client session.

---

## 4. Decisions and Assumptions
- **Clerk Dashboard as Sovereign Source of Truth**: Clerk's `publicMetadata.role === 'admin'` is the definitive source of truth for admin privileges.
- **Eliminate Auto-Sync Overwrites**: Completely remove the automatic Clerk metadata mutation from `lib/auth/admin.ts`. The codebase will NEVER modify or restore user metadata in Clerk on its own.
- **Live Direct Fetch**: In `checkAdminAccess()`, fetch the live user directly from the Clerk Backend API (`clerk.users.getUser(userId)`) using the server-side `CLERK_SECRET_KEY`. This guarantees that manual edits in the Clerk Dashboard are detected immediately upon page refresh, bypassing stale JWT session tokens.
- **Client Synchronization**: Update `public-header.tsx` and `app/admin/page.tsx` to ensure they synchronize against `/api/admin/check` so that role revocations and promotions reflect immediately in the UI.
- **Clerk Dashboard Instructions**: Provide clear, exact steps for managing admins in Clerk (Public Metadata tab, valid JSON format, clicking Save).

---

## 5. Files Expected to Touch
- `lib/auth/admin.ts`
- `components/navigation/public-header.tsx`
- `app/admin/page.tsx`

---

## 6. Requirements
1. In `lib/auth/admin.ts`:
   - Use `createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY }).users.getUser(user.id)` to fetch live user data directly from Clerk's API.
   - Check `liveUser.publicMetadata?.role === 'admin'`.
   - Remove the auto-synchronization write (`clerk.users.updateUserMetadata`) completely.
   - Remove hardcoded default fallback emails (e.g., `'emmanuelopokunyame@gmail.com'`), checking `process.env.ADMIN_EMAILS` only if explicitly provided as an optional environment override.
2. In `components/navigation/public-header.tsx`:
   - Ensure the admin check dynamically resolves from `/api/admin/check` so that revoking an admin in Clerk removes the "Admin" link immediately upon page refresh.
3. In `app/admin/page.tsx`:
   - Ensure the admin access guard verifies with `/api/admin/check` so revoked admins are immediately blocked upon page refresh.

---

## 7. Security Considerations
- `CLERK_SECRET_KEY` remains strictly server-side inside `lib/auth/admin.ts`.
- All admin API routes (`/api/admin/providers`, `/api/admin/services`, `/api/admin/check`) continue to use `checkAdminAccess()` for strict server-side gating.

---

## 8. Acceptance Criteria
- TypeScript check (`npx tsc --noEmit`) passes with 0 errors.
- ESLint check (`npm run lint`) passes with 0 errors.
- Production build (`npm run build`) passes.
- Manually adding `{"role": "admin"}` in Clerk's Public Metadata immediately grants admin access upon page reload.
- Manually removing `{"role": "admin"}` in Clerk's Public Metadata immediately revokes admin access upon page reload without being overwritten.

---

## 9. Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

---

## 10. Exact Manual Test Steps
1. **To Add an Admin in Clerk Dashboard**:
   - Go to [dashboard.clerk.com](https://dashboard.clerk.com) -> **Users**.
   - Click on the user's name or email.
   - Scroll down to the **Metadata** section.
   - Under **Public Metadata**, enter:
     ```json
     {
       "role": "admin"
     }
     ```
   - Click the blue **Save** button.
   - Refresh the Fix it website (F5). The **Admin** link appears in the navbar and `/admin` is accessible.
2. **To Remove an Admin in Clerk Dashboard**:
   - Go to [dashboard.clerk.com](https://dashboard.clerk.com) -> **Users**.
   - Click on the user.
   - Under **Public Metadata**, delete `"role": "admin"` or set it to `{}`.
   - Click the blue **Save** button.
   - Refresh the Fix it website (F5). The **Admin** link disappears and navigating to `/admin` shows access denied.
