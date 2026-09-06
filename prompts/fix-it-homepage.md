# Implementation Prompt: Fix it Public Homepage

## 1. Goal
Implement the full public homepage for **Fix it** based exactly on the desktop reference specification in `c:\Users\emman\Desktop\tasklink\.design\1.png`, adhering strictly to the design system tokens, typography, and principles established in `.design/fix it design system.png`.

## 2. Skills Read & Applied
- `sanity-best-practices`: Content structure conventions and future CMS integration points.
- Next.js 16 App Router docs in `node_modules/next/dist/docs/01-app`: Component boundaries, server/client splitting, image optimization.
- `AGENTS.md`: Strict visual reproduction of `.design/1.png`, mobile responsiveness, reusing existing Tailwind tokens, and running all required verification checks.

## 3. Code & Config Inspected
- `.design/1.png`: Complete desktop reference image showcasing 11 distinct sections:
  1. Top navigation bar with logo, dropdown menus ("Fix it Pro", "Explore"), Language "EN", "Become a Provider", "Sign in", and "Join" button.
  2. Hero section with rich background photography, headline ("Our local professionals will take it from here"), full-width search input, quick service pills with right arrows, and Ghana location links ("Accra", "Kumasi", "Tema", "Takoradi").
  3. Category icons row (9 rounded cards: Plumbing, Cleaning, Electrical, Painting, Moving, Assembly, Gardening, Repairs, More Services).
  4. "Popular services" section (6 green-header cards with custom illustrations and booking action buttons).
  5. "Make it all happen with local professionals" (4 value pillars with icons and "Join now" CTA).
  6. "fix it pro." green banner (brand green `#003912`, bullet features, white CTA button, guarantee badge, pro card illustration).
  7. "Big home project? We handle it." dark banner (`#0A0A0A`, description, "Explore services" button, provider portraits showcase).
  8. "What success on Fix it looks like" (custom styled video preview container with progress controls).
  9. "Guides to help you at home" (3 cards with images and titles, "See more guides" link).
  10. "Local services at your fingertips" CTA banner (deep Burgundy `#4D1727` with accent Orange `#FF7646` script text, "Join Fix it" white button).
  11. Multi-column marketplace footer (5 columns: Categories, For Customers, For Providers, Business Solutions, Company; bottom copyright bar with social icons, English, and GHS currency).
- `app/globals.css`: Tailwind v4 theme variables, brand green (`#003912`), marketing accents (Cyan, Burgundy, Orange), neutrals, and typography utilities.
- `app/layout.tsx`: Root layout with `Plus_Jakarta_Sans` Grotesque font and Satoshi body font.

## 4. Decisions & Assumptions
1. **Preserve Design System Showcase**:
   - Move the current design system showcase to `app/design-system/page.tsx` so it remains fully accessible and testable at `/design-system`.
   - Implement the complete homepage on `app/page.tsx`.
2. **Modular Component Architecture**:
   - Break the homepage into clean, focused components in `components/home/`:
     - `public-header.tsx`: Top header navigation with Fix it logo, dropdowns, and auth links.
     - `hero.tsx`: Atmospheric hero section with search bar, quick pills, and Ghana city tags.
     - `category-strip.tsx`: 9 category icon cards in a horizontal grid.
     - `popular-services.tsx`: 6 popular service cards with dark green header blocks.
     - `value-props.tsx`: 4 value proposition columns with "Join now" button.
     - `pro-banner.tsx`: Fix it Pro deep green feature banner.
     - `big-project-banner.tsx`: Dark home project banner with provider portraits.
     - `video-section.tsx`: "What success looks like" showcase container.
     - `guides-section.tsx`: 3 home maintenance guide cards.
     - `cta-banner.tsx`: Burgundy and orange "fingertips" call-to-action banner.
     - `footer.tsx`: 5-column marketplace footer and bottom utility bar.
3. **Imagery & Visual Polish**:
   - Use high-quality, relevant service and workshop photography from Unsplash conforming to Section 13 Imagery Rules (service-relevant, authentic people, trade-neutral graphics).
   - Use Lucide icons matching the 24px / 1.5–2px stroke specification.
4. **Mobile Responsiveness**:
   - Desktop layout (1280px) reproduced exactly from `.design/1.png`.
   - On mobile/tablet: multi-column grids gracefully stack to 2-column or 1-column layouts; pills wrap or scroll cleanly; header collapses to mobile-friendly view.

## 5. Files to Touch
- `app/design-system/page.tsx`: [NEW] Relocate design system showcase here.
- `components/navigation/public-header.tsx`: [NEW] Homepage top navbar matching `.design/1.png`.
- `components/navigation/footer.tsx`: [NEW] 5-column footer matching `.design/1.png`.
- `components/home/hero.tsx`: [NEW] Hero banner with search and city links.
- `components/home/category-strip.tsx`: [NEW] 9 category cards.
- `components/home/popular-services.tsx`: [NEW] 6 popular service cards with green header bars.
- `components/home/value-props.tsx`: [NEW] 4 value proposition columns.
- `components/home/pro-banner.tsx`: [NEW] Fix it Pro green banner.
- `components/home/big-project-banner.tsx`: [NEW] Big home projects dark banner.
- `components/home/video-section.tsx`: [NEW] Video showcase container.
- `components/home/guides-section.tsx`: [NEW] Home guides cards.
- `components/home/cta-banner.tsx`: [NEW] Burgundy "fingertips" banner.
- `app/page.tsx`: [MODIFY] Compose homepage sections into the main route.

## 6. Security & Boundaries
- All client-facing components remain presentationally safe.
- Search input directs queries via URL parameters (`/search?q=...`) for server-side processing.
- No secrets or tokens stored on client components.

## 7. Acceptance Criteria
1. Exact visual parity with `.design/1.png` across all 11 sections.
2. Responsive down to 375px mobile screens.
3. Clean TypeScript compilation with `npx tsc --noEmit` (0 errors).
4. Clean linter verification with `npm run lint` (0 errors).
5. Clean production build with `npm run build` (0 errors).

## 8. Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## 9. Exact Manual Test Steps
1. Navigate to `http://localhost:3000` in your browser.
2. Verify Top Header: "Fix it." logo, "Fix it Pro", "Explore", "EN", "Become a Provider", "Sign in", and "Join" button.
3. Verify Hero Section: Background image, "Our local professionals will take it from here" headline, search input, quick service pills (`Plumbing ->`, etc.), and Ghana cities (`Accra`, `Kumasi`, `Tema`, `Takoradi`).
4. Verify Category Strip: 9 category icons (Plumbing, Cleaning, Electrical, Painting, Moving, Assembly, Gardening, Repairs, More Services).
5. Verify Popular Services: 6 cards with green header blocks and booking action buttons.
6. Verify Value Propositions: 4 columns with icons and "Join now" button.
7. Verify Fix it Pro Banner: Deep green `#003912` background, bullet list, white "Find a professional" button, guarantee badge.
8. Verify Big Project Banner: Dark container with portraits and "Explore services" button.
9. Verify Video Section: "What success on Fix it looks like" player container.
10. Verify Guides Section: 3 cards with titles and "See more guides" link.
11. Verify CTA Banner: Burgundy `#4D1727` container with italic orange "fingertips" and "Join Fix it" button.
12. Verify Footer: 5 navigation columns and bottom bar with GHS currency.
13. Navigate to `http://localhost:3000/design-system` to confirm the design system showcase remains fully accessible.
14. Resize browser to 375px width to verify responsive stacking on mobile.
