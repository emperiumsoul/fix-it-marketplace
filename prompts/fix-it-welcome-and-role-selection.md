# Implementation Prompt: Personalized Welcome Page (`3.png`) and Role Selection Modal (`2.png`)

## 1. Goal
Implement the post-login **Personalized Welcome Page** matching desktop reference [3.png](file:///c:/Users/emman/Desktop/tasklink/.design/3.png) and the **Role Selection Modal** matching desktop reference [2.png](file:///c:/Users/emman/Desktop/tasklink/.design/2.png). When a user logs in (or visits with authenticated state), the personalized welcome page (`3.png`) is displayed, and if the user has not yet designated their marketplace role, the role selection modal (`2.png`) appears overlaid on top. If the user selects "I am a customer", the modal closes and they remain on the welcome page (`3.png`). If they select "I'm a service provider", they are directed to the provider onboarding sequence (`/provider/onboarding`) to create their provider profile.

## 2. Skills Read & Applied
- `sanity-best-practices`:
  - Fetching top active services and public provider profiles server-side via `getServerClient()` to power the "Explore popular services on Fix it" section.
- `AGENTS.md`:
  - Section 1: "You will build the Sanity content model, authentication and customer and provider accounts with Clerk, the public homepage, the personalized homepage... provider onboarding and dashboard, service creation..."
  - Section 2: Write implementation prompt in `prompts/`, confirm with user via question panel, implement, run checks, and report.
  - Section 3: Exact reproduction of desktop reference `3.png` and `2.png` (typography, spacing, colors, button styling, responsiveness down to mobile).
  - Section 5 & 8: Clerk user id keys user state. Keep public and private profiles distinct. Onboarding sequence captures display name, trades/expertise, service areas in Ghana, and availability.

## 3. Code & Assets Inspected
- Design References:
  - `1.png`: Signed-out public landing page (existing `components/home/*`).
  - `2.png`: Role selection modal ("ksoul1, your account has been created! What brings you to Fix it?").
  - `3.png`: Signed-in personalized welcome page ("Welcome to Fix it, Kingsley", 3 recommended cards, category tab switcher + 4 service cards).
- `app/page.tsx`: Root homepage that will switch between public landing page (`1.png`) when signed out and personalized welcome page (`3.png`) when signed in.
- `components/navigation/public-header.tsx`: Header with Clerk `UserButton`, search bar, and utility links.
- `components/navigation/category-nav.tsx`: Secondary category strip.
- `sanity/lib/server-client.ts`: Private server client for fetching published services.

## 4. Decisions & Assumptions
1. **Homepage Auth Switching (`app/page.tsx`)**:
   - For signed-out visitors: Render the public landing page (`1.png`).
   - For signed-in users (via Clerk `currentUser()` or client `<SignedIn>`/`useUser()`): Render the personalized welcome page (`3.png`).
   - Also support `?preview=welcome` / `?modal=true` query parameters for instant testing and demonstration without requiring an active Clerk login session.
2. **Personalized Welcome Page Components (`components/welcome/*`)**:
   - `WelcomeHeader`: Dynamic greeting `Welcome to Fix it, [FirstName || Username]`, with subtle green ambient radial gradient.
   - `RecommendedCards`: 3 cards in a responsive row:
     1. "Post a project brief" — *Get tailored offers for your needs.*
     2. "Download the Fix it app" — *Stay productive, anywhere you go.*
     3. "Tailor Fix it to your needs" — *Complete your profile.* (can re-open role modal).
   - `ExplorePopularSection`:
     - Heading: `Explore popular services on Fix it` with `Show All` and `<` `>` controls.
     - Left column: 4 category tabs (`House Cleaning`, `Plumbing`, `Electrical Repairs`, `Painting & Decorating`).
     - Right column: 4 rich service cards matching the active tab with provider avatar, verification badge, title, star rating, starting price in GHS, and video consultation indicator.
3. **Role Selection Modal (`components/welcome/role-modal.tsx` matching `2.png`)**:
   - Fullscreen backdrop blur overlay.
   - Heading: `[Username], your account has been created! What brings you to Fix it?`
   - Subtitle: `We'll tailor your experience to fit your needs.`
   - Selection Option 1: `I am a customer` (illustration with document and magnifying glass).
   - Selection Option 2: `I'm a service provider` (illustration with user avatar and star badge; `I'm looking to offer my services.`).
   - `Next` button:
     - If customer: Persists role to `localStorage` (`fixit_role = 'customer'`) and closes modal to stay on `3.png`.
     - If provider: Persists role (`fixit_role = 'provider'`) and navigates to `/provider/onboarding`.
4. **Provider Onboarding Sequence (`app/provider/onboarding/page.tsx`)**:
   - Clean, focused multi-step onboarding sequence for Ghanaian service pros:
     - Step 1: Professional Details (display name, headline, category/trades).
     - Step 2: Service Areas in Ghana (Accra, Tema, Kumasi, East Legon) & Working Availability.
     - Step 3: Bio & Review Profile.
     - Finish: Submits and redirects to provider dashboard/profile.

## 5. Files to Touch
- `components/welcome/role-modal.tsx`: [NEW] Role selection modal matching `2.png`.
- `components/welcome/welcome-hero.tsx`: [NEW] Personalized greeting & 3 recommended cards matching `3.png`.
- `components/welcome/welcome-explore.tsx`: [NEW] Left category tabs + 4 service cards carousel matching `3.png`.
- `components/welcome/personalized-homepage.tsx`: [NEW] Assembly of personalized welcome page with `RoleModal`.
- `app/provider/onboarding/page.tsx`: [NEW] Provider onboarding sequence for profile creation.
- `app/page.tsx`: [MODIFY] Seamlessly switch between Public Homepage (`1.png`) and Personalized Welcome Page (`3.png`).

## 6. Requirements
- Exact visual fidelity with `3.png` for the signed-in welcome page (typography, spacing, badges, cards, colors).
- Exact visual fidelity with `2.png` for the role selection modal overlay.
- Clicking "I am a customer" and "Next" keeps user on `3.png`.
- Clicking "I'm a service provider" and "Next" routes user to `/provider/onboarding`.
- Signed-out users continue to see `1.png`.

## 7. Security Considerations
- Authentication handled strictly via Clerk.
- Sensitive provider verification and internal IDs remain server-side.

## 8. Acceptance Criteria
- Signed-in user visiting `/` sees the Personalized Welcome Page (`3.png`).
- On first visit, `2.png` modal is displayed over `3.png`.
- Selecting "I am a customer" closes the modal and preserves `3.png`.
- Selecting "I'm a service provider" navigates to `/provider/onboarding`.
- Tab switching in `Explore popular services` updates displayed services smoothly.
- `npx tsc --noEmit` and `npm run lint` pass with 0 errors.

## 9. Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## 10. Manual Test Steps
1. Navigate to `http://localhost:3000?preview=welcome` (or sign in via Clerk).
2. Verify `3.png` renders: `Welcome to Fix it, [Name]`, 3 recommended cards, category tabs on the left, and 4 service cards on the right.
3. Verify `2.png` modal is displayed on top: `[Name], your account has been created! What brings you to Fix it?`.
4. Select "I am a customer" and click "Next" -> verify modal closes and user stays on `3.png`.
5. Re-open modal (or visit `?modal=true`), select "I'm a service provider", and click "Next" -> verify navigation to `/provider/onboarding`.
6. Complete onboarding steps -> verify success.
