# Fix Welcome Modal Flash and Google Login Performance

## Context & Objectives
1. **Stop `2.png` Modal from Flashing**:
   - `components/welcome/personalized-homepage.tsx` had `isModalOpen = userForcedOpen || forceModalParam || (!userDismissed && (!isLoaded || !hasRole))`.
   - While Clerk is loading (`!isLoaded`), `isModalOpen` defaulted to `true`. This caused the `RoleModal` to flash onto the screen on every login / reload before Clerk finished loading.
   - The modal must ONLY appear for genuine first-time users (newly registered users who haven't completed role selection). Existing users logging in should NEVER see it flash or appear.

2. **Diagnose and Optimize Slow Google Login ("Join - Login with Google")**:
   - Identify the cause of the slow Google login latency.
   - Primary culprit: Windows system clock skew (`2026` vs real time) causing Clerk development instance session refresh loops and remote roundtrips (`Clerk: Clock skew detected... Refreshing the session token resulted in an infinite redirect loop`).
   - Secondary culprit: Background `UserSync` calling slow sequential Clerk API calls (`auth()`, `currentUser()`, `clerk.users.getUser()`) in `/api/profile/sync`.
   - Third culprit: Client-side modal asset loading vs direct Clerk provider configuration.

## Key Files
- `components/welcome/personalized-homepage.tsx`: Fix modal open condition, eliminate `!isLoaded` flash, and gate to first-time users only.
- `components/welcome/role-modal.tsx`: Mark `hasCompletedRoleSelection: true` in user metadata and localStorage on dismissal/selection.
- `components/auth/user-sync.tsx`: Optimize background sync debounce and avoid blocking renders.
- `app/api/profile/sync/route.ts`: Streamline user extraction without redundant network hops.
