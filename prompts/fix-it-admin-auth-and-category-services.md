# Implementation Prompt: Admin Authorization & Category Service Display Fix

## Goal
Resolve two critical issues reported by the user:
1. **Admin Authorization**: Restrict the Admin Dashboard (`/admin`), Admin API endpoints, and header Admin link so only verified platform administrators (e.g. `role: "admin"` or configured in `ADMIN_EMAILS`) can see or access them. Currently, every logged-in user can access the admin panel.
2. **Category Services Display**: Ensure that all provider-created services reliably appear under their corresponding category on `/categories/[slug]` (such as House Cleaning, Plumbing, Electrical Repairs, Moving, Painting, etc.) immediately upon creation, resolving static caching issues and category mapping mismatches.

## Skills Read & Applied
- `sanity-best-practices` (`SKILL.md` and `references/nextjs.md`): Server-side Sanity queries, dynamic rendering rules (`export const dynamic = 'force-dynamic'`), path revalidation (`revalidatePath`), and decoupling private tokens from client components.
- `AGENTS.md`: Mandatory development loop, role-based boundary enforcement, server-only secret tokens, short bulleted report format, interactive question panel approval.

## Code Inspected
- `app/admin/page.tsx`: Currently lacks authorization gates; allows any authenticated user to view moderation tools and provider verification actions.
- `app/api/admin/providers/route.ts` & `app/api/admin/services/route.ts`: Only check `if (!userId) return 401`; do not verify if `userId` is an authorized administrator.
- `components/navigation/public-header.tsx`: Renders the "Admin" button unconditionally for all signed-in users in both desktop and mobile navigation.
- `app/categories/[slug]/page.tsx`: Lacks `export const dynamic = 'force-dynamic'`, causing Next.js to serve statically cached pages without fresh Sanity service records.
- `components/provider/dashboard-modals.tsx` (`CreateServiceModal`): Dropdown options mismatch Sanity category titles/slugs (e.g. "Moving Services" vs "Moving & Relocation", "Gardening & Lawn Care" vs "Gardening & Landscaping").
- `app/api/provider/service/route.ts`: Fails category fuzzy matching on mismatched names, falling back to the first available category (`[0]`), and does not trigger `revalidatePath`.
- `proxy.ts`: Middleware configuration for Clerk auth.

## Decisions & Assumptions
1. **Admin Authorization Standard**:
   - Create `lib/auth/admin.ts` with `checkAdminAccess()` and `isCurrentUserAdmin()`:
     - Checks Clerk user `publicMetadata.role === 'admin'`.
     - Checks if user email is in `process.env.ADMIN_EMAILS` (defaulting to `emmanuelopokunyame@gmail.com`).
     - Checks `process.env.ADMIN_USER_IDS`.
   - Add `/api/admin/check` endpoint returning `{ isAdmin: boolean }` so client components can seamlessly check permissions.
   - For Emmanuel Opoku Nyame (`emmanuelopokunyame@gmail.com`), initialize `publicMetadata.role = 'admin'` via Clerk backend SDK and synchronize automatically.
   - Non-admins attempting to access `/admin` see an "Access Denied: Platform Administrator Required" screen, and `/api/admin/...` routes return `403 Forbidden`.
   - The "Admin" button in `public-header.tsx` is only displayed if `isAdmin` is true.
2. **Category Service Display & Dynamic Fetching**:
   - Add `export const dynamic = 'force-dynamic'` to `app/categories/[slug]/page.tsx` so category pages always fetch real-time published services from Sanity.
   - Update `CreateServiceModal` in `components/provider/dashboard-modals.tsx` to align category select options exactly with Sanity categories (providing both title and slug).
   - Enhance `app/api/provider/service/route.ts` to match category by slug, mapped slug, title, and tokenized trade keywords, eliminating accidental fallbacks to the first category.
   - Add `revalidatePath('/categories/[slug]', 'page')` and `revalidatePath('/')` in `app/api/provider/service/route.ts` and `app/api/admin/services/route.ts`.

## Files Expected to Touch
1. `lib/auth/admin.ts` [NEW]: Centralized admin verification helper using Clerk `currentUser` and environment config.
2. `app/api/admin/check/route.ts` [NEW]: Endpoint to check whether the active user is an administrator.
3. `app/api/admin/providers/route.ts` [MODIFY]: Enforce admin verification (return 403 for non-admins).
4. `app/api/admin/services/route.ts` [MODIFY]: Enforce admin verification (return 403 for non-admins) and add `revalidatePath`.
5. `app/admin/page.tsx` [MODIFY]: Render admin gate / access denied screen for unauthorized users.
6. `components/navigation/public-header.tsx` [MODIFY]: Only show Admin navigation link to verified admins.
7. `app/categories/[slug]/page.tsx` [MODIFY]: Add `export const dynamic = 'force-dynamic'` and strengthen GROQ query for category matching.
8. `components/provider/dashboard-modals.tsx` [MODIFY]: Standardize Ghanaian trade categories in `CreateServiceModal` (title + slug).
9. `app/api/provider/service/route.ts` [MODIFY]: Bulletproof category lookup and add route revalidation.
10. `.env.local` & `.env.example` [MODIFY]: Add `ADMIN_EMAILS=emmanuelopokunyame@gmail.com`.

## Security Considerations
- Zero token exposure: All Sanity read/write tokens and Clerk secret keys remain strictly server-side.
- Fail closed: If auth check fails or user is unauthenticated or not an admin, `/api/admin/...` rejects with `403 Forbidden`.
- Client-side navigation hiding is paired with robust server-side route protection.

## Acceptance Criteria
- [ ] Regular users and service providers (like Kingsley Donkor) DO NOT see the "Admin" button in the header.
- [ ] Accessing `/admin` as a non-admin displays "Access Restricted: Platform Administrator Required" and blocks all moderation actions.
- [ ] Only designated admins (e.g. `emmanuelopokunyame@gmail.com` or users with `role: "admin"`) see the "Admin" button and can access `/admin`.
- [ ] Provider-created services appear immediately under their corresponding category (e.g., `/categories/cleaning`, `/categories/plumbing`, etc.) without caching delay.
- [ ] Creating a service under any trade (Moving, Gardening, Home Repairs, Painting, etc.) accurately links to that specific category document in Sanity.

## Verification & Checks to Run
- Run `node scripts/test-category-query.mjs` to verify GROQ category matching.
- Run `npx tsc --noEmit` to ensure zero TypeScript errors.
- Run `npm run lint` to verify clean linting.
- Run `npm run build` to confirm production build passes with dynamic routes.
- Test admin access endpoints with both admin and non-admin states.

## Exact Manual Test Steps
1. Log in with an admin account (`emmanuelopokunyame@gmail.com`):
   - Confirm the "Admin" link appears in the top header.
   - Navigate to `http://localhost:3000/admin` and verify the dashboard loads providers and services.
2. Log in with a non-admin provider account (e.g., `kingsleydonkor44@gmail.com`):
   - Confirm the "Admin" link does NOT appear in the header.
   - Attempt to navigate directly to `http://localhost:3000/admin` and confirm the "Access Restricted" screen appears.
3. Open `http://localhost:3000/categories/cleaning` or `/categories/house-cleaning`:
   - Confirm Kingsley Donkor's "Professional cleaning" service card is clearly displayed in the grid with verified badge.
4. From the provider dashboard (`/provider/dashboard`), create a new service under a different category (e.g. "Plumbing" or "Moving & Relocation"):
   - Navigate to the respective category page (e.g. `/categories/plumbing` or `/categories/moving-relocation`).
   - Confirm the newly created service appears immediately in that category.
