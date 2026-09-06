# Implementation Prompt: Dynamic Provider Trade & Skill Experience in Onboarding

## 1. Goal
Ensure that whenever a provider selects or edits their primary service/trade (e.g. **Plumbing**, **Electrical Repairs**, **Painting**, **House Cleaning**, **Moving**, **Furniture Assembly**, **Gardening**, etc.), the entire profile creation experience dynamically adapts to that trade:
1. **Trade-Specific About Guidance**: `"Share your [trade] experience, the services you offer, and the areas you cover."`
2. **Trade-Specific Skill Experience Cards**: Replaces hardcoded cleaning skills with relevant trade tasks (e.g. for Plumbing: *Pipe installation & repair*, *Drain clearing & unblocking*, *Bathroom fixture fitting*) with interactive experience level selection (*Beginner*, *Intermediate*, *Expert*).
3. **Trade-Specific Work Experience Guidance**: `"Add your previous [trade] work to help customers understand your experience."`
4. **Trade-Specific Certification Guidance**: `"Add any [trade], safety, or technical certifications you hold."`
5. **Trade Category Selector in Profile Modal**: Add an explicit Trade Category selector in the basic info editing modal, so selecting or switching trades immediately cascades throughout the entire onboarding and public profile views.

---

## 2. Skills & Standards Referenced
- `sanity-best-practices`: Modeling provider expertise and taxonomy coherence across trades.
- `AGENTS.md`: Keeping content coherent from top to bottom; matching service work offered; preserving exact reference layout while making dynamic values reflect the provider's actual trade.

---

## 3. Code Inspected
- `components/provider/onboarding-profile-view.tsx`:
  - Line 33: Hardcoded initial headline `"Home Cleaning Specialist"`.
  - Line 39-42: Hardcoded skill levels: `"House cleaning"`, `"Deep cleaning"`, `"Move-out cleaning"`.
  - Line 228: Hardcoded copy `"Share your cleaning experience..."`.
  - Line 250: Hardcoded array `["House cleaning", "Deep cleaning", "Move-out cleaning"]`.
  - Line 289: Hardcoded `"Add your previous cleaning work..."`.
  - Line 398: Hardcoded `"Add any cleaning, hygiene, or safety certifications you hold."`.
- `components/provider/profile-modals.tsx`:
  - `EditBasicInfoModal` / `EditBasicInfoForm`: Allows text input for headline, but does not offer quick trade category selection or emit trade change events to update skills.
- `app/provider/profile/page.tsx`:
  - Uses `primaryService` or `headline` but can be enhanced to align packages, about text, and services with the chosen trade.

---

## 4. Key Decisions & Assumptions
1. **Trade Catalog & Mapping Configuration**:
   Create a centralized trade mapping dictionary covering all marketplace categories:
   - **Plumbing**: Skills: *Pipe installation & repair*, *Drain clearing & unblocking*, *Bathroom fixture fitting* (noun: "plumbing").
   - **House Cleaning**: Skills: *House cleaning*, *Deep cleaning*, *Move-out cleaning* (noun: "cleaning").
   - **Electrical Repairs**: Skills: *Wiring & socket installation*, *Circuit breaker & panel repair*, *Lighting & appliance fitting* (noun: "electrical").
   - **Painting**: Skills: *Interior wall painting*, *Exterior painting & waterproofing*, *Surface prep & plastering* (noun: "painting").
   - **Moving Services**: Skills: *Furniture packing & wrapping*, *Loading & transport logistics*, *Appliance handling* (noun: "moving").
   - **Furniture Assembly**: Skills: *Flat-pack assembly*, *Bed & wardrobe installation*, *Custom woodwork & carpentry* (noun: "furniture assembly").
   - **Gardening & Lawn Care**: Skills: *Lawn mowing & weeding*, *Hedge trimming & pruning*, *Compound landscaping* (noun: "gardening").
   - **Home Repairs**: Skills: *Door & lock repair*, *Masonry & drywall patching*, *Fixture mounting* (noun: "home repair").
2. **Trade Detection & Cascade**:
   - Implement `getTradeConfig(headlineOrTrade)` that parses any headline or trade (e.g. `"Plumbing"` -> Plumbing config).
   - When the user selects or updates their trade (e.g. from "Cleaning" to "Plumbing"), the skills list automatically updates to the plumbing skills, resetting or preserving levels, and all onboarding descriptions adapt dynamically.
3. **Interactive Skill Experience Selector**:
   - Clicking each skill chip cycles through `Beginner` -> `Intermediate` -> `Expert` (or opens a level picker), matching design 6.png.
   - Support adding custom skills under the active trade.
4. **Modal Category Selector**:
   - In `EditBasicInfoModal`, provide a direct Category / Trade dropdown so the user can switch between Plumbing, Cleaning, Electrical, Painting, etc. with one click, or type a custom headline.
5. **Persistence**:
   - Save selected trade, headline, and trade skills to Clerk `unsafeMetadata` and `localStorage`, persisting through to dashboard and public profile.

---

## 5. Files to Touch
1. `components/provider/onboarding-profile-view.tsx` [MODIFY]:
   - Add trade configuration and dynamic trade detection.
   - Bind skill chips, about copy, work experience copy, and certification copy to the active trade.
   - Update `cycleLevel` and skill management.
2. `components/provider/profile-modals.tsx` [MODIFY]:
   - Add trade category dropdown to `EditBasicInfoForm` and pass selected trade to parent.
3. `app/provider/profile/page.tsx` [MODIFY]:
   - Ensure the public provider profile renders the dynamic trade, services, and packages matching the selected trade.

---

## 6. Acceptance Criteria
- [x] Selecting "Plumbing" updates the headline to Plumbing (or custom headline).
- [x] About section copy displays: "Share your plumbing experience, the services you offer, and the areas you cover."
- [x] The 3 skill experience cards display plumbing skills (*Pipe installation & repair*, *Drain clearing & unblocking*, *Bathroom fixture fitting*) with selectable experience levels (*Beginner*, *Intermediate*, *Expert*).
- [x] Work experience copy displays: "Add your previous plumbing work to help customers understand your experience."
- [x] Certifications copy displays: "Add any plumbing, safety, or technical certifications you hold."
- [x] Switching to any other trade (Electrical, Painting, Cleaning, Moving, Gardening, etc.) cascades identically across all copy and skills.
- [x] TypeScript check, ESLint, and Next.js production build pass with 0 errors.

---

## 7. Manual Verification Steps
1. Navigate to `http://localhost:3000/provider/onboarding`.
2. Click the edit icon next to the trade headline (e.g. "Plumbing" or "Home Cleaning Specialist").
3. Select "Plumbing" from the trade dropdown and click "Save Changes".
4. Verify that:
   - About copy mentions "plumbing experience".
   - 3 skill cards show plumbing skills (*Pipe installation & repair*, *Drain clearing & unblocking*, *Bathroom fixture fitting*).
   - Clicking each chip cycles through Beginner / Intermediate / Expert.
   - Work experience mentions "previous plumbing work".
   - Certifications mentions "plumbing certifications".
5. Change trade to "Electrical Repairs" or "Painting": verify all skills and copy immediately adapt to electrical or painting.
6. Click "Save & Continue to Dashboard" and verify settings persist to `/provider/dashboard` and `/provider/profile`.
