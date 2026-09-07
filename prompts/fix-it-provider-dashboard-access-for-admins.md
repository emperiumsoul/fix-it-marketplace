# Implementation Prompt: Provider Dashboard Access for Administrators & Providers

## Goal
Ensure that any user who logs in and becomes a service provider (including platform administrators) has immediate, seamless access to their Provider Dashboard (`/provider/dashboard`), their business tools, orders, and services, with two-way navigation between the Provider Dashboard and Admin Operations.

## Skills Read & Applied
- `sanity-best-practices` (`SKILL.md` and `references/nextjs.md`): Separation of concerns between public browsing and authenticated provider/admin experiences, Next.js routing best practices.
- `AGENTS.md`: Authentication boundaries, role-based checks, interactive question panel approval loop, and short bulleted reports.

## Code Inspected
- `components/navigation/public-header.tsx`: Only displayed a "Become a Provider" button which always routed to `/provider/onboarding`. There was no direct "Provider Dashboard" link in the header for authenticated users or admins.
- `components/provider/dashboard-header.tsx`: Rendered provider navigation tabs, but did not have an "Admin Operations" link for administrators.
- `app/admin/page.tsx`: Lacked a link to the Provider Dashboard for administrators who are also providers (e.g. Kingsley Donkor).
- `app/provider/dashboard/page.tsx` & `app/api/provider/dashboard-data/route.ts`: Data access keys off Clerk `userId`, allowing any authenticated user to manage their provider services.

## Decisions & Assumptions
1. **Header Navigation Enhancement (`components/navigation/public-header.tsx`)**:
   - For signed-in users who are providers (`user.unsafeMetadata.role === "provider"`, `fixit_role === "provider"`, or administrators):
     - Display a direct **"Provider Dashboard"** link in the navigation header bar (desktop and mobile).
     - If the user is also an administrator, display BOTH **"Provider Dashboard"** and **"Admin"**.
     - If `handleBecomeProvider` is clicked by a user who already has a provider profile or role, navigate directly to `/provider/dashboard` instead of restarting onboarding.
2. **Two-Way Navigation Between Admin and Provider Views**:
   - In `app/admin/page.tsx`: Add a dedicated **"Provider Dashboard"** link in the header actions next to "Sanity Studio" and "Refresh".
   - In `components/provider/dashboard-header.tsx`: If the user is an admin (`isAdmin`), add an **"Admin Operations"** button/badge allowing one-click return to `/admin`.

## Files Expected to Touch
1. `components/navigation/public-header.tsx` [MODIFY]: Show "Provider Dashboard" link for providers and admins; improve `handleBecomeProvider` routing.
2. `components/provider/dashboard-header.tsx` [MODIFY]: Add "Admin Operations" navigation link for admin users.
3. `app/admin/page.tsx` [MODIFY]: Add "Provider Dashboard" quick-action link in the top action bar.

## Security Considerations
- Role separation is maintained: regular providers cannot access `/admin` (enforced on both frontend and backend).
- Administrators who offer services can freely access both `/admin` (moderation) and `/provider/dashboard` (their own services, orders, and earnings) using their authenticated Clerk identity.

## Acceptance Criteria
- [ ] Any logged-in user who is a service provider sees "Provider Dashboard" in the main navigation header.
- [ ] Platform administrators (such as Kingsley Donkor or Emmanuel) can access `/provider/dashboard` and `/admin` seamlessly.
- [ ] On `/admin`, an administrator can click "Provider Dashboard" to switch to their provider dashboard.
- [ ] On `/provider/dashboard`, an administrator can click "Admin Operations" to switch back to the admin dashboard.
- [ ] Non-admin service providers remain restricted from accessing `/admin`.

## Verification & Checks to Run
- Run `npx tsc --noEmit` to verify type safety.
- Run `npm run lint` to confirm clean linting.
- Verify navigation links in browser dev environment.

## Exact Manual Test Steps
1. Log in with Kingsley Donkor (`kingsleydonkor44@gmail.com`).
2. Verify the top header shows BOTH "Provider Dashboard" and "Admin".
3. Click "Provider Dashboard": verify `/provider/dashboard` loads Kingsley's services, orders, and metrics.
4. On `/provider/dashboard`, verify the "Admin Operations" button is visible and click it to go to `/admin`.
5. On `/admin`, click "Provider Dashboard" to confirm immediate return to the provider dashboard.
