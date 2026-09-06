# Implementation Prompt: Mandatory Role Selection on Login

## Goal
Ensure that when a user registers or logs in to Fix it, the application does **not** automatically assume the customer role or dismiss the role selection modal (`2.png`). Instead, the modal must display over the personalized welcome page (`3.png`) and strictly wait for the user to select whether they want to request services ("I am a customer") or offer services ("I'm a service provider").

## Skills Read
- `sanity-best-practices`
- Next.js App Router guidelines & server/client boundaries
- Clerk Authentication docs (`useUser`, `user.unsafeMetadata`, `user.update`)

## Code Inspected
- `components/welcome/role-modal.tsx`:
  - Previously initialized `selectedRole` to `"customer"` (`useState("customer")`).
  - Previously included an 'X' close button and backdrop click dismissal.
  - Only stored role to `localStorage`.
- `components/welcome/personalized-homepage.tsx`:
  - Read `localStorage.getItem("fixit_role_modal_dismissed")` which, if previously set, caused the modal to close immediately on mount via `useEffect`.
  - Did not check Clerk user metadata to determine if a real role was ever chosen.
- `app/page.tsx`:
  - Authenticated users are routed to `PersonalizedHomepage`.
- `app/provider/onboarding/page.tsx`:
  - Completes provider onboarding and stores provider state.

## Decisions and Assumptions
1. **Unselected by Default**: The role selection modal (`2.png`) will start with `selectedRole = null` so neither option is pre-selected.
2. **Disabled Action**: The "Next" button will be disabled until the user explicitly clicks on either "I am a customer" or "I'm a service provider".
3. **Mandatory / Non-dismissible**: When a user has not yet chosen their role, the modal cannot be dismissed (no 'X' button, no backdrop click dismissal). It must block and wait for user selection.
4. **Persistent Account Role in Clerk & Local Storage**: When the user clicks "Next", update Clerk's user metadata via `await user.update({ unsafeMetadata: { role: selectedRole } })` and save to `localStorage.setItem("fixit_role", selectedRole)`.
5. **Route Redirection**:
   - If "I am a customer" is selected: Close modal, user stays on the personalized homepage (`3.png`).
   - If "I'm a service provider" is selected: Close modal, redirect user immediately to `/provider/onboarding` to complete their profile.
6. **Reopening Role Modal**: If a user later clicks "Tailor Fix it to your needs" on `3.png`, the modal can be reopened, and in that scenario (since a role already exists), it allows dismissal or updating.

## Files Expected to Touch
- `components/welcome/role-modal.tsx`
- `components/welcome/personalized-homepage.tsx`

## Requirements
- Modal must display immediately upon login if `user.unsafeMetadata.role` (or local state) is unset.
- Initial state must be neutral (`selectedRole: null`) with no pre-checked radio/card.
- "Next" CTA must be disabled until a role card is clicked.
- Card selection visually highlights the chosen card with dark border and checkmark per `2.png`.
- Selecting "I am a customer" and clicking "Next" keeps user on `3.png` and marks the choice in Clerk.
- Selecting "I'm a service provider" and clicking "Next" sends user to `/provider/onboarding`.
- Remove auto-dismissal caused by stale `fixit_role_modal_dismissed` flags.

## Security Considerations
- Role selection is client-initiated on the authenticated user's own Clerk session using `user.update({ unsafeMetadata })`.
- No sensitive keys are exposed to the browser.
- Respects Clerk's authentication state (`isLoaded`, `isSignedIn`).

## Acceptance Criteria
- [ ] Fresh login or users without a role see the Role Selection Modal (`2.png`) centered over the Welcome Page (`3.png`).
- [ ] The modal cannot be dismissed without making a selection.
- [ ] Neither card is selected by default; "Next" button is disabled until a choice is made.
- [ ] Clicking "I am a customer" highlights the customer card, enables "Next", and on click, saves role and shows `3.png`.
- [ ] Clicking "I'm a service provider" highlights the provider card, enables "Next", and on click, saves role and redirects to `/provider/onboarding`.

## Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## Exact Manual Test Steps
1. Navigate to `http://localhost:3000` while signed in or visit `http://localhost:3000/?preview=welcome&reset=true`.
2. Verify that the Role Modal (`2.png`) appears centered over the welcome page (`3.png`).
3. Verify that neither card is pre-selected and the "Next" button is disabled.
4. Verify there is no 'X' button to dismiss the modal without choosing.
5. Click "I am a customer" and observe the card gets selected and "Next" becomes enabled.
6. Click "Next" -> observe the modal closes and you stay on the personalized homepage (`3.png`).
7. Reopen via "Tailor Fix it to your needs" card -> select "I'm a service provider" -> click "Next" -> observe redirect to `/provider/onboarding`.
