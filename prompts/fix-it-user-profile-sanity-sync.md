# Fix it — Sync Clerk Users and Profiles to Sanity Studio

## 1. Goal
Connect Clerk authentication and provider onboarding to Sanity Studio so that:
1. Every authenticated user gets an automatically synced `customerProfile` document in Sanity Studio.
2. Every provider who completes onboarding on `/provider/onboarding` or edits their profile on `/provider/profile` has a full `providerProfile` document created or updated in Sanity Studio.
3. Both customer and provider profiles are viewable immediately in Sanity Studio under **Bookings & Operations -> Customer Profiles** and **Public Marketplace -> Provider Profiles**.

---

## 2. Skills Read
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`): Schema constraints, GROQ query lookup patterns, server-side client with write token, letting Sanity generate `_id` values rather than hardcoding deterministic IDs.
- `Next.js App Router Route Handlers` (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md`): Server-side API endpoints (`app/api/.../route.ts`) executing mutations with protected Clerk auth.

---

## 3. Code Inspected
- `components/provider/onboarding-profile-view.tsx`: Currently saves profile only to `user.update({ unsafeMetadata })` and `localStorage`, bypassing Sanity.
- `app/provider/profile/page.tsx`: Reads and updates metadata locally without syncing to Sanity.
- `studio/schemaTypes/documents/provider-profile.ts`: Sanity schema requiring `displayName`, `slug`, `clerkUserId`, and optional fields `headline`, `expertise`, `bio`, `languages`, `serviceAreas`, `workExperience`, `education`, `certifications`, `onboardingStatus`.
- `studio/schemaTypes/documents/customer-profile.ts`: Sanity schema requiring `clerkUserId`, `fullName`, `email`, optional `phone`, `address`, `city`.
- `sanity/lib/server-client.ts`: `getServerClient({ useWriteToken: true })` configured to use `SANITY_API_WRITE_TOKEN`.
- `.env.local`: `SANITY_API_WRITE_TOKEN` and `CLERK_SECRET_KEY` are present and configured.
- `app/layout.tsx`: Root layout with `<ClerkProvider>`.

---

## 4. Decisions and Assumptions
1. **Server Route Boundary**: In adherence to `AGENTS.md`, mutations to Sanity NEVER occur on the client. All writes go through Next.js server Route Handlers (`/api/...`) that authenticate the user via Clerk's server `auth()`.
2. **Sanity Document IDs**: Following `sanity-best-practices`, we do not invent arbitrary UUIDs for documents. We check if an existing document matches `clerkUserId == $userId`. If found, we patch it; if not, we use `client.create()` to allow Sanity to assign standard IDs.
3. **Customer Auto-Sync**: A lightweight client component `<UserSync />` placed inside `<ClerkProvider>` in `app/layout.tsx` checks if an authenticated user has been synced in the current session. If not, it pings `/api/profile/sync` which ensures their `customerProfile` document exists in Sanity with their Clerk name and email.
4. **Provider Profile Creation**: When the provider onboarding form (`/provider/onboarding`) or provider profile editor is submitted, it POSTs the full profile payload to `/api/provider/profile`, creating/updating the `providerProfile` document in Sanity while keeping `unsafeMetadata` updated for immediate UI responsiveness.
5. **Portable Text Bio**: Provide valid Portable Text block structure for the provider `bio` field to adhere to the `blockContent` schema requirement in Sanity.

---

## 5. Files to Create and Touch
- `[NEW]` `app/api/provider/profile/route.ts`: Server route handler to create/update `providerProfile` in Sanity for authenticated user.
- `[NEW]` `app/api/profile/sync/route.ts`: Server route handler to ensure `customerProfile` exists in Sanity for authenticated user.
- `[NEW]` `components/auth/user-sync.tsx`: Client component to trigger background sync when a user logs in.
- `[MODIFY]` `components/provider/onboarding-profile-view.tsx`: Wire `handleSaveAndContinue` to send profile data to `/api/provider/profile`.
- `[MODIFY]` `app/provider/profile/page.tsx`: Wire profile updates to `/api/provider/profile`.
- `[MODIFY]` `app/layout.tsx`: Include `<UserSync />` inside `<ClerkProvider>`.

---

## 6. Requirements
1. **Provider Profile Creation**:
   - Slug automatically derived from `displayName` (e.g. `kwame-mensah`).
   - Fields populated: `displayName`, `slug`, `clerkUserId`, `headline`, `expertise`, `languages`, `serviceAreas`, `onboardingStatus` ('verified' / 'pending_review'), `bio` (Portable Text), `workExperience`, `education`, `certifications`.
2. **Customer Profile Sync**:
   - `clerkUserId`, `fullName` (or email username fallback), `email`, default `city` ('Accra').
   - Idempotent: Does not create duplicate profiles if the user logs in repeatedly.
3. **Graceful Error Handling**:
   - Returns appropriate HTTP status codes (`401 Unauthorized` if not logged in, `400 Bad Request` if invalid input, `500 Internal Error` with descriptive log if Sanity mutation fails).

---

## 7. Security Considerations
- **Server Write Token**: `SANITY_API_WRITE_TOKEN` stays strictly server-side.
- **Ownership Verification**: Route handlers call `await auth()` from `@clerk/nextjs/server` to guarantee that a user can only create or edit documents matching their own `clerkUserId`. Users cannot overwrite someone else's profile.
- **Data Validation**: Sanitize and validate inputs before submitting to Sanity.

---

## 8. Acceptance Criteria
- [ ] Any user who logs in or signs up via Clerk has a corresponding `customerProfile` record in Sanity Studio under **Bookings & Operations -> Customer Profiles**.
- [ ] Any user who completes onboarding at `/provider/onboarding` has a corresponding `providerProfile` record in Sanity Studio under **Public Marketplace -> Provider Profiles**.
- [ ] Modifying provider profile details updates the existing document in Sanity rather than creating duplicate entries.
- [ ] Type check and lint pass cleanly.

---

## 9. Checks to Run
1. TypeScript check: `npx tsc --noEmit`
2. Next.js ESLint: `npm run lint`
3. Verification of Sanity Studio displaying the newly synced profiles.

---

## 10. Manual Test Steps
1. Navigate to `http://localhost:3000/sign-in` or sign up with an account.
2. Open Sanity Studio at `http://localhost:3333` (or hosted Studio). Click **Bookings & Operations** -> **Customer Profiles**. Verify the user appears.
3. In the web app, navigate to `http://localhost:3000/provider/onboarding`. Fill out the onboarding form and click **Save & Complete Onboarding**.
4. In Sanity Studio, click **Public Marketplace** -> **Provider Profiles**. Verify the newly created provider profile appears with their display name, headline, skills, and details.
