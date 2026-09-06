# Implementation Prompt: Provider Onboarding Profile Creation (6.png) & Provider Dashboard (7.png)

## Goal
Implement the exact Provider Onboarding Profile Creation page matching `.design/6.png` at `/provider/onboarding` and the Provider Dashboard matching `.design/7.png` at `/provider/dashboard` for Fix it in Ghana.

## Skills Read
- `sanity-best-practices`
- Next.js App Router guidelines & Clerk authentication integration (`useUser`, metadata updates)
- Tailwind CSS responsive design

## Code Inspected
- `.design/6.png`: Source of truth for Provider Profile Creation during onboarding ("Review your new profile").
- `.design/7.png`: Source of truth for Provider Dashboard with profile strength (7/12) and 5 visibility steps.
- `app/provider/onboarding/page.tsx`: Existing placeholder onboarding page.
- `studio/schemaTypes/documents/provider-profile.ts`: Stored schema representation for provider fields (displayName, headline, bio, languages, serviceAreas, availability, portfolio, workExperience, education, certifications, onboardingStatus, verificationStatus).

## Decisions and Assumptions
1. **Onboarding Profile Creation (`6.png`)**:
   - **Header**: Minimal top bar with "Fix it." logo on the left and an "Exit" link on the right returning to `/`.
   - **Title**: "Review your new profile / Add missing details to complete your profile. You can update it at any time."
   - **Profile Card**:
     - Large avatar placeholder with camera icon badge for photo upload.
     - Editable display name with pencil icon (`Add display name ✎`).
     - Username tag (`@ksoul1` or authenticated Clerk username).
     - Editable professional headline (`Home Cleaning Specialist ✎` or trade specialist).
     - Location: `Ghana` with pin icon.
     - Languages: `Add language ✎` (e.g. English, Twi, Ga).
     - **About**: Bio section with document illustration and 3 skill chips with experience level dropdowns (`House cleaning`, `Deep cleaning`, `Move-out cleaning` or trade-specific skills).
     - **Work experience (Optional)**: Checklist document illustration and `+ Add work experience` interactive modal.
     - **Education (Optional)**: Card with `+ Add education` interactive modal.
     - **Certifications (Optional)**: Card with `+ Add certifications` interactive modal.
     - **Submit Action**: "Save & Continue to Dashboard" button saving profile details to Clerk `user.unsafeMetadata` and local storage, and navigating to `/provider/dashboard`.
2. **Provider Dashboard (`7.png`)**:
   - **Header**: Dedicated provider dashboard navigation: `Dashboard` (active), `My Business ⌵`, `Bookings ⌵`, `Earnings ⌵`, utility icons (Bell, Mail, Help), and User avatar button `K` with active green status dot.
   - **Status Banner Card**:
     - Provider avatar, Name (e.g. `Kingsley`), `@username`.
     - Green shield badge: `New provider`.
     - Link: `View profile`.
     - Right: `Available >` interactive status dropdown/toggle.
     - Notice: `ⓘ You're not visible yet. Complete the steps below so customers can find you.`
   - **Profile Strength Card**:
     - Header: `Profile Strength` with counter `7 / 12`.
     - Progress bar reflecting ~60% completion.
     - Showcase prompt: Briefcase icon, "Showcase your work", "Add photos of completed jobs so customers can see what you offer.", and `Add portfolio` button (opens portfolio modal).
     - Link: `Show all (5)`.
   - **Onboarding Steps Card**:
     - Header: `Complete these steps to become visible to customers`
     - Step 1: `Read the Trust & Safety guide (Optional)` with `Skip` button and `Read guide` solid button (opens modal).
     - Step 2: `Create your first service` with `Create a service` button.
     - Step 3: `Verify your identity` with lock icon.
     - Step 4: `Set your service area and availability` with lock icon.
     - Step 5: `Publish your service` with lock icon.
   - **Footer**: Standard 5-column Fix it footer with language and currency selectors.
3. **Route Management**:
   - `/provider/onboarding`: The profile review & creation page (`6.png`).
   - `/provider/dashboard`: The full provider dashboard (`7.png`).
   - `/provider`: Redirects to `/provider/dashboard`.

## Files Expected to Touch
- [MODIFY] `app/provider/onboarding/page.tsx`
- [NEW] `components/provider/onboarding-profile-view.tsx`
- [NEW] `components/provider/profile-modals.tsx` (Work experience, education, certification modals)
- [NEW] `app/provider/dashboard/page.tsx`
- [NEW] `app/provider/page.tsx`
- [NEW] `components/provider/dashboard-header.tsx`
- [NEW] `components/provider/dashboard-profile-banner.tsx`
- [NEW] `components/provider/profile-strength-card.tsx`
- [NEW] `components/provider/visibility-steps-card.tsx`
- [NEW] `components/provider/dashboard-modals.tsx` (Portfolio modal, Trust & Safety guide modal, Service creator modal)

## Requirements
- Match layout, spacing, typography, colors, and states of `.design/6.png` and `.design/7.png` exactly.
- Support interactive editing of profile fields (display name, headline, language, experience levels).
- Interactive modals for adding work experience, education, certifications, and portfolio items.
- Smooth transition between Onboarding completion and the Provider Dashboard.
- Fully responsive across desktop and mobile.

## Security Considerations
- Profile updates are stored to the authenticated user's own Clerk metadata (`user.unsafeMetadata`) and browser local storage.
- No sensitive credentials or API keys exposed to the client.

## Acceptance Criteria
- [ ] Navigating to `/provider/onboarding` displays the exact "Review your new profile" page from `6.png`.
- [ ] User can edit display name, headline, add languages, and set experience levels.
- [ ] Clicking "+ Add work experience", "+ Add education", "+ Add certifications" opens modals that save items to the profile.
- [ ] Saving profile marks onboarding complete and navigates to `/provider/dashboard`.
- [ ] Navigating to `/provider/dashboard` displays the exact Provider Dashboard from `7.png`.
- [ ] Top banner displays provider details, "New provider" badge, and "Available >" status.
- [ ] Profile strength card shows "7 / 12" and allows adding portfolio items.
- [ ] Visibility steps card shows the 5 steps; clicking "Read guide" opens the Trust & Safety modal; Step 1 can be skipped or marked complete.
- [ ] All checks (`npx tsc --noEmit`, `npm run lint`, `npm run build`) pass cleanly.

## Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## Exact Manual Test Steps
1. Navigate to `http://localhost:3000/provider/onboarding`.
2. Verify visual match with `.design/6.png` (avatar placeholder, `@ksoul1` / Clerk handle, 3 skill cards, work experience, education, certifications).
3. Click on the display name or pencil icon -> edit display name.
4. Click "+ Add work experience" -> fill in company/role -> save -> observe it added.
5. Click "Save & Continue to Dashboard" -> verify navigation to `http://localhost:3000/provider/dashboard`.
6. Verify visual match with `.design/7.png` (dashboard header, New provider badge, Profile Strength 7/12, 5 visibility steps).
7. Click "Read guide" on Step 1 -> inspect Trust & Safety modal -> click "Done" -> step updates.
8. Click "Add portfolio" on Profile Strength card -> verify portfolio modal opens.
