# Implementation Prompt: Fix it Category Page & Search Experience

## 1. Goal
Implement the high-fidelity **Category Page** (`/categories/[slug]`) reproducing the exact visual hierarchy, layout, color palette, and interactive components from the desktop reference image [4.png](file:///c:/Users/emman/Desktop/tasklink/.design/4.png), and build the comprehensive **Search Results Page** (`/search`) powered by the seeded Sanity catalog in accordance with Section 3, 7, and 11 of `AGENTS.md`. The category page will be fully dynamic for `cleaning` (the canonical reference) as well as all other seeded categories (plumbing, electrical repairs, painting, moving, furniture assembly, gardening, home repairs), and the search experience will feature token-based matching, location/category/price filters, sorting, and structured service card results.

## 2. Skills Read & Applied
- `sanity-best-practices`:
  - Server-side data fetching with `getServerClient()` from `sanity/lib/server-client.ts` using private tokens server-side.
  - Image rendering using `urlFor(image)` from `sanity/lib/image.ts`.
  - GROQ queries with projection and dereferencing (`category->`, `provider->`).
- `AGENTS.md`:
  - Section 1: Use the agreed reference pages across all service categories. Cleaning is the example category used in reference `4.png`.
  - Section 3: Exact reproduction of desktop reference `4.png` (typography, spacing, colors, dark green category hero banner, "Most popular in Cleaning" pills, "Big cleaning project? We'll handle it" promo card, "Explore Cleaning" 12-item rich grid, Guides cards, FAQs accordion, Tag Cloud, and "Find local help — your way" 3 action cards). Responsive down to mobile.
  - Section 5 & 12: Public browsing pages are read-only and display stored Sanity data. Private read tokens stay on the server.
  - Section 7 & 11: Search is a full results page (`/search`), not a chatbox and not a compact widget. Returns ranked service cards with result count and sort control. Matches titles, categories, and included tasks first. Grounds every result in real data with prices in GHS.

## 3. Code & Config Inspected
- Design Reference: [.design/4.png](file:///c:/Users/emman/Desktop/tasklink/.design/4.png)
- `sanity/lib/server-client.ts`: `getServerClient()` for server-side private dataset access.
- `sanity/lib/image.ts`: `urlFor()` image URL builder.
- `components/navigation/public-header.tsx`: Existing header to be augmented with interactive search input, active category nav bar, and navigation to `/search` and `/categories/[slug]`.
- `components/cards/service-card.tsx`: Card component for rendering service listings in search results.
- `components/navigation/footer.tsx`: Standard footer.

## 4. Decisions & Assumptions
1. **Category Page (`/categories/[slug]`) Architecture**:
   - Dynamic route at `app/categories/[slug]/page.tsx` that queries Sanity for the category by slug or title match.
   - Supports aliases (e.g. `cleaning` maps to `house-cleaning`, `electrical` maps to `electrical-repairs`).
   - Fetches related services, category subcategories, and active local provider profiles for that category from Sanity.
   - For `cleaning`, provides full faithful adherence to `4.png`, including the exact 12 subcategory hub items in "Explore Cleaning", the 3 guide cards, and the 6 FAQ items. For other categories, dynamically adapts hero text, popular subcategories, and FAQs while maintaining the exact visual layout.
2. **Category Page Sections Matching `4.png` Exactly**:
   - **Header & Category Nav Bar**: Logo, search input with magnifying button, nav links, and secondary category strip (`Plumbing`, `Cleaning` (active state), `Electrical Repairs`, `Painting`, `Moving`, `Furniture Assembly`, `Gardening`, `Home Repairs`).
   - **Hero Banner**: Dark forest green container (`#0A3821`), with left "Book a cleaner" booking search widget (Location picker defaulting to Accra, Date picker, bright green "Search" button), center H1 heading (`Cleaning`), subtitle (`A cleaner space, without the hassle.`), `How Fix it Works` video button, and right 3D-styled cleaning supply visual composition.
   - **Most Popular Pills**: Horizontal scrollable pills with icons (`House Cleaning`, `Deep Cleaning`, `Office Cleaning`, `Move-out Cleaning`, `Sofa Cleaning`) and arrow controls.
   - **"Big project? We'll handle it" Banner**: Light green card with 3 checkmarks, "Discuss your project" dark green button, and 3 white provider preview cards (`Home cleaning`, `Office cleaning`, `Deep cleaning`).
   - **"Explore [Category]" Grid**: 4-column x 3-row grid of 12 rich service cards featuring high-res imagery and nested sub-service links linking to search.
   - **"Guides related to [Category]"**: 3 guide cards featuring cost estimate graphic (`GHS 250 - 400`), cleaning checklist, and preparation tips.
   - **"[Category] FAQs"**: Centered accordion with 6 expandable questions and answers.
   - **"You might be interested in [Category]"**: Tag cloud of 24 interactive pill buttons linking to specific search queries.
   - **"Find local help — your way"**: 3 action cards ("Post a job request", "Find a cleaning professional", "Plan a larger cleaning project").
3. **Search Results Page (`/search`)**:
   - Route at `app/search/page.tsx` supporting URL search params:
     - `q`: Free-text query.
     - `category`: Category slug.
     - `location`: Ghana city/area (Accra, Kumasi, Tema, East Legon).
     - `minPrice` / `maxPrice`: Budget range in GHS.
     - `sort`: `relevance`, `price_asc`, `price_desc`.
   - Token-based search matching service titles, category titles, included tasks, summaries, and provider expertise.
   - Displays result count (e.g. `Found 12 services in Ghana`), active filter chips, sort dropdown, and empty state with reset filters.
   - Renders matching cards using `ServiceCard` with GHS pricing, Ghanaian localities, and provider display names.

## 5. Files to Touch
- `components/navigation/category-nav.tsx`: [NEW] Secondary horizontal category bar below header with active state indicator.
- `components/category/category-hero.tsx`: [NEW] Dark green hero banner with interactive "Book a cleaner" widget and visual assets.
- `components/category/popular-subcategories.tsx`: [NEW] "Most popular in [Category]" carousel with pill items.
- `components/category/big-project-card.tsx`: [NEW] "Big project? We'll handle it" promo banner with checkmarks and provider avatar cards.
- `components/category/explore-grid.tsx`: [NEW] 12-item subcategory service hub grid with sub-links.
- `components/category/category-guides.tsx`: [NEW] 3 visual guide cards with cost estimates and checklists.
- `components/category/category-faqs.tsx`: [NEW] Interactive accordion FAQ component.
- `components/category/category-tags.tsx`: [NEW] Tag cloud with 24 pill links to search.
- `components/category/help-options.tsx`: [NEW] "Find local help — your way" 3 action cards.
- `app/categories/[slug]/page.tsx`: [NEW] Server-rendered category page wiring Sanity content with all reference components.
- `app/search/page.tsx`: [NEW] Full search results page with sidebar filters, sorting, result count, and service cards.
- `components/navigation/public-header.tsx`: [MODIFY] Wire search input to submit to `/search?q=...` and integrate category sub-nav.

## 6. Requirements
- The Category page must match `4.png` in visual hierarchy, spacing, colors, typography, and section order.
- The hero booking widget allows selecting a location (Accra, Tema, Kumasi, East Legon), preferred date, and clicking "Search" redirects to `/search?category=[slug]&location=[location]&date=[date]`.
- All sub-links in the "Explore" grid and tag cloud must navigate to search results with the corresponding filter or keyword.
- Search page returns ranked services with result counts and filters by location, category, and budget in GHS.
- Grounded data: Every service card displays stored Sanity data (GHS prices, real Ghanaian locations, provider names).

## 7. Security Considerations
- Read tokens remain strictly server-side in Server Components; no tokens exposed to the client.
- Exclude private customer profiles, private addresses, messages, and unconfirmed bookings from search results.
- Sanitize and encode search parameters to prevent injection.

## 8. Acceptance Criteria
- Visiting `/categories/cleaning` or `/categories/house-cleaning` displays the complete UI matching `4.png`.
- Interactive FAQ accordions expand and collapse smoothly.
- The "Book a cleaner" widget on the hero navigates to `/search` with selected parameters.
- Visiting `/search?q=cleaning` or `/search?category=cleaning` displays ranked service result cards with GHS pricing.
- Header search bar on all pages submits queries to `/search?q=[query]`.
- TypeScript (`npx tsc --noEmit`) and ESLint (`npm run lint`) pass with 0 errors.

## 9. Checks to Run
- `npx tsc --noEmit` in web workspace.
- `npm run lint` in web workspace.
- Validate dev server renders `/categories/cleaning` and `/search` with HTTP 200.

## 10. Manual Verification Steps
1. Navigate to `http://localhost:3000/categories/cleaning` in your browser.
2. Verify all sections from `4.png`:
   - Dark green hero with "Book a cleaner" widget and "How Fix it Works" button.
   - "Most popular in Cleaning" pill row.
   - "Big cleaning project? We'll handle it" card with 3 provider previews.
   - "Explore Cleaning" 12-item subcategory grid.
   - "Guides related to Cleaning" cards with GHS cost estimates.
   - "Cleaning FAQs" accordion (click each question to verify smooth expansion).
   - "You might be interested in Cleaning" tag cloud.
   - "Find local help — your way" 3 action cards.
3. Test search: Type a query in the header (e.g. "plumbing" or "leak") and press Enter. Verify `/search?q=plumbing` loads matching services.
4. On `/search`, test filtering by location ("Accra", "Kumasi") and sorting by price.
