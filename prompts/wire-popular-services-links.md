# Implementation Prompt: Wire Popular Services Links on Homepage

## 1. Goal
Make all items in the "Popular services" section on the homepage fully clickable and functional, routing users directly to the newly implemented Category landing pages (`/categories/[slug]`) and ensuring search route aliases (`?service=...` as alias for `?category=...`) are supported across the application.

## 2. Skills Read & Applied
- `sanity-best-practices`:
  - Ensuring category slugs match Sanity dataset schemas (`house-cleaning`, `plumbing`, `electrical-repairs`, `painting-decorating`, `moving-relocation`, `furniture-assembly`).
- `AGENTS.md`:
  - Section 1: Customers find and hire local service providers across categories; category pages and search results must be coherently linked.
  - Section 2: Write prompt in `prompts/`, obtain confirmation via question panel, implement, run checks, and report.
  - Section 3: Preserve exact layout, spacing, colors, and typography of UI reference cards.
  - Section 5: Public browsing pages are read-only and route through Next.js App Router without nested interactive anchor tags.

## 3. Code Inspected
- `components/home/popular-services.tsx`: Found that the outer card container was a non-clickable `div`, only the bottom button was an `<a>` link, and the `href` used `/search?service=...` which had not been mapped in `app/search/page.tsx`.
- `app/search/page.tsx`: Inspecting search params parsing; `sp.service` was not handled as a fallback alias for `sp.category`.
- `components/home/hero.tsx`: Quick service pills used `/search?service=...`.
- `components/home/category-strip.tsx`: Checked category link paths.

## 4. Decisions & Assumptions
1. **Full Card Clickability**:
   - Wrap the entire card in `components/home/popular-services.tsx` in a Next.js `<Link>` component with `cursor-pointer`, so clicking anywhere on the card (green top banner, illustration area, or bottom action button) navigates immediately.
   - Replace the inner `<Link>` button with a styled `div`/`span` to avoid invalid HTML nested interactive elements (`<a>` inside `<a>`) and eliminate hydration warnings.
2. **Category Route Mapping**:
   - House Cleaning -> `/categories/cleaning` (which maps to `house-cleaning`)
   - Plumbing -> `/categories/plumbing`
   - Electrical Repairs -> `/categories/electrical-repairs`
   - Painting -> `/categories/painting-decorating`
   - Moving -> `/categories/moving-relocation`
   - Furniture Assembly -> `/categories/furniture-assembly`
3. **Search Fallback Robustness**:
   - In `app/search/page.tsx`, accept `service` query parameter as an alias for `category`, so if any external link or legacy route opens `/search?service=cleaning` or `/search?service=plumbing`, it automatically resolves to the category filter and displays the relevant service cards.
4. **Hero & Category Strip Alignment**:
   - Align quick service links in `components/home/hero.tsx` and `components/home/category-strip.tsx` with the canonical category routes (`/categories/...`).

## 5. Files to Touch
- `components/home/popular-services.tsx`: [MODIFY] Wrap whole card in Next.js `<Link>`, update hrefs to `/categories/[slug]`, replace nested anchor with button pill styling.
- `app/search/page.tsx`: [MODIFY] Support `service` parameter as alias to `category` in `SearchPage`.
- `components/home/hero.tsx`: [MODIFY] Update quick service pills to route to `/categories/[slug]`.
- `components/home/category-strip.tsx`: [MODIFY] Update category strip icons to route to `/categories/[slug]`.

## 6. Requirements
- Clicking on any card in the "Popular services" section (green header, illustration, or action button) must navigate to the corresponding category page (`/categories/cleaning`, `/categories/plumbing`, etc.).
- There must be no invalid nested `<a>` inside `<a>` markup.
- Querying `/search?service=cleaning` or `/search?service=plumbing` must filter results identically to `?category=...`.
- All pages must pass TypeScript (`npx tsc --noEmit`) and ESLint (`npm run lint`) with 0 errors.

## 7. Security Considerations
- All navigation happens via Next.js client router links with sanitized parameters.
- No sensitive user tokens or client keys are exposed.

## 8. Acceptance Criteria
- Clicking "House Cleaning" or "Book Cleaning" on the homepage opens `/categories/cleaning` with the full UI matching `4.png`.
- Clicking "Plumbing" or "Book a Plumber" opens `/categories/plumbing`.
- Clicking "Electrical Repairs" or "Book an Electrician" opens `/categories/electrical-repairs`.
- Clicking "Painting" or "Book a Painter" opens `/categories/painting-decorating`.
- Clicking "Moving" or "Get a Quote" opens `/categories/moving-relocation`.
- Clicking "Furniture Assembly" or "Book Assembly" opens `/categories/furniture-assembly`.
- Dev build, typecheck, and lint pass with 0 errors.

## 9. Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## 10. Manual Test Steps
1. Navigate to `http://localhost:3000`.
2. Scroll to the "Popular services" section.
3. Click on the "House Cleaning" card (or "Book Cleaning" button) -> verify it opens `/categories/cleaning`.
4. Click on the "Plumbing" card -> verify it opens `/categories/plumbing`.
5. Click on the "Electrical Repairs" card -> verify it opens `/categories/electrical-repairs`.
6. Click on the "Painting", "Moving", and "Furniture Assembly" cards -> verify each opens its respective category page.
7. Test `/search?service=cleaning` in URL bar -> verify it filters services to house cleaning.
