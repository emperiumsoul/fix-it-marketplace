# Implementation Prompt: Fix "Join Fix it" and Homepage Action Buttons

## 1. Goal
Fix the non-functional "Join Fix it" button in the homepage CTA banner (and related placeholder buttons like "Join now" in ValueProps) by wiring it directly to Clerk's authentication system (`<SignUpButton mode="modal">`) for signed-out users, and routing signed-in users to `/search` ("Explore Services").

## 2. Skills Read & Applied
- `AGENTS.md`:
  - Section 1 & 5: Authentication is Clerk, wired through Next.js middleware.
  - Section 2: Write prompt in `prompts/`, confirm with user via question panel, implement, run checks, and report.
  - Section 7: Grounded auth actions and navigation; no dead placeholder links (`#join`).

## 3. Code Inspected
- `components/home/cta-banner.tsx`: Contained a static `<Link href="#join">` with no interactive handler, causing clicks on "Join Fix it" to do nothing.
- `components/home/value-props.tsx`: Also contained a static `<Link href="#join">` for "Join now".
- `components/navigation/public-header.tsx`: Verified that `<SignUpButton mode="modal">` and `<Show when="signed-out">` / `<Show when="signed-in">` are the established pattern for Clerk modal signups.

## 4. Decisions & Assumptions
1. **Interactive Clerk Signup Modal**:
   - In `components/home/cta-banner.tsx`, convert to a client component (`"use client"`).
   - Wrap the "Join Fix it" button in Clerk's `<SignUpButton mode="modal">` when the user is signed out (`<Show when="signed-out">`).
   - When the user is already signed in (`<Show when="signed-in">`), display an "Explore Services" link leading to `/search`.
2. **ValueProps Action Button**:
   - Apply the same pattern to `components/home/value-props.tsx` ("Join now" button), converting dead `#join` into the Clerk `<SignUpButton mode="modal">` and `/search` link when signed in.
3. **Preserve Visual Design**:
   - Maintain the exact styling, font sizes, margins, white pill button appearance, and hover transitions from the screenshot.

## 5. Files to Touch
- `components/home/cta-banner.tsx`: [MODIFY] Add `"use client"`, wrap button with `<SignUpButton mode="modal">` and `<Show>` components.
- `components/home/value-props.tsx`: [MODIFY] Add `"use client"`, wrap "Join now" with `<SignUpButton mode="modal">` and `<Show>` components.

## 6. Requirements
- Clicking "Join Fix it" on the homepage CTA banner must immediately trigger the Clerk sign-up modal dialog for signed-out visitors.
- If already authenticated, the button offers a direct path to explore services.
- No dummy anchor links (`href="#join"`) remain in these components.
- Zero TypeScript errors (`npx tsc --noEmit`), zero ESLint warnings (`npm run lint`), and production build compiles cleanly (`npm run build`).

## 7. Security Considerations
- Uses Clerk's secure authentication modal with publishable key; no server secret keys exposed to the client.

## 8. Acceptance Criteria
- Clicking "Join Fix it" opens the Clerk sign-up modal.
- Clicking "Join now" in ValueProps opens the Clerk sign-up modal.
- All checks pass cleanly.

## 9. Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## 10. Manual Test Steps
1. Navigate to `http://localhost:3000`.
2. Scroll to the "Local services at your fingertips" maroon banner.
3. Click "Join Fix it" -> verify Clerk sign-up modal opens on screen.
4. Scroll up to the "Make it all happen with local professionals" section.
5. Click "Join now" -> verify Clerk sign-up modal opens on screen.
