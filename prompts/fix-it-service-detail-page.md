# Implementation Prompt: Service Detail and Booking Page (5.png)

## Goal
Implement the complete, responsive Service Detail and Booking experience matching `.design/5.png` for Fix it at `/services/[slug]`. Customers can inspect service packages, photo gallery, provider details, customer reviews, feature comparison, interactive FAQs, and submit a booking request with date and time selection.

## Skills Read
- `sanity-best-practices`
- `sanity-migration`
- Next.js App Router conventions & dynamic routing (`app/services/[slug]/page.tsx`)
- Tailwind CSS styling & component architecture

## Code Inspected
- `.design/5.png`: The desktop source-of-truth reference for the Service Detail Page.
- `app/categories/[slug]/page.tsx`: Established patterns for dynamic routes, metadata generation, and Sanity server-client integration.
- `components/cards/service-card.tsx`: Links cards directly to `/services/${slug}`.
- `components/category/help-options.tsx`: Existing "Need more help?" card patterns.
- `studio/schemaTypes/documents/service.ts` & `service-package.ts`: Stored schema representation for service listings, packages, prices in GHS, FAQs, and provider references.

## Decisions and Assumptions
1. **Route Location**: Implement `app/services/[slug]/page.tsx` with dynamic metadata and data fetching. It will seamlessly serve any service slug, falling back gracefully to the reference "I will clean your home and living spaces" data from `5.png` if an unseeded or mock slug is accessed.
2. **Layout Structure**:
   - Two-column desktop layout: Left column (~67%) with gallery, spotlight quote, about section, provider profile card, recent projects, package comparison table, recommended services, interactive FAQs, related tags, and bottom help cards.
   - Right column (~33%): Sticky booking card with interactive package tabs (`Regular`, `Deep`, `Move-out`), dynamic price display (`GH₵150`, `GH₵300`, `GH₵400`), property size dropdown, date picker, time picker, "Request booking" CTA, "Contact provider" CTA, followed by the comprehensive customer reviews module.
   - Responsive design: On mobile, gracefully stack columns with the booking card accessible, preserving all elements and spacing.
3. **Interactive Features**:
   - **Gallery Slider**: Clickable thumbnails and left/right navigation arrows to cycle through hero gallery images, including the branded promotional green badge ("Home cleaning / A cleaner home. A happier you.").
   - **Package Selection**: Switching packages in the booking card or clicking "Select" in the comparison table synchronizes the active package, price, scope, and inclusions.
   - **Booking Request**: Interactive date, time, and property size inputs with a booking confirmation modal dialog showing agreed scope and GHS pricing.
   - **Contact Provider**: Functional modal/drawer allowing users to message the provider.
   - **FAQs Accordion**: Expandable/collapsible Q&A for the 6 FAQs shown in `5.png`.
   - **Reviews Filter & Search**: Searchable and filterable review list with rating distribution bars matching the 4.9/5.0 rating breakdown.
4. **Cohesive Marketplace Data**: Real Ghana context (Accra, GHS currency, verified provider badges, local neighborhoods like East Legon, Tema).

## Files Expected to Touch
- [NEW] `app/services/[slug]/page.tsx`: Service detail route and server metadata.
- [NEW] `components/service-detail/service-gallery.tsx`: Main hero image with badge, arrow controls, and thumbnail strip.
- [NEW] `components/service-detail/service-booking-sidebar.tsx`: Sticky booking card with package tabs, property size, date/time pickers, and CTAs.
- [NEW] `components/service-detail/service-reviews.tsx`: Customer reviews module with breakdown bars, search/filter, and review cards.
- [NEW] `components/service-detail/service-package-comparison.tsx`: Side-by-side feature comparison table with action buttons.
- [NEW] `components/service-detail/service-provider-card.tsx`: "Meet Neat Home" provider card with 4-column meta and contact button.
- [NEW] `components/service-detail/service-recent-projects.tsx`: Portfolio grid showing recent cleaning projects with highlighted project card.
- [NEW] `components/service-detail/service-faqs.tsx`: Interactive FAQ accordion.
- [NEW] `components/service-detail/service-booking-modal.tsx`: Booking request modal dialog with date/time recap.
- [NEW] `components/service-detail/service-contact-modal.tsx`: Customer-provider messaging modal.

## Requirements
- Match `.design/5.png` layout, typography, colors, borders, and spacing exactly.
- Breadcrumb: `Home / Cleaning / House Cleaning`.
- Service header: `I will clean your home and living spaces` by `Neat Home` with rating `4.9 (24 reviews)` and location `Accra`.
- All 3 packages represented: Regular Clean (`GH₵150`), Deep Clean (`GH₵300`), Move-out Clean (`GH₵400`).
- Booking sidebar with date/time pickers and interactive booking submission.
- Feature comparison matrix table with checkmarks and dashes.
- FAQs with smooth collapse/expand transitions.
- Related tags and bottom "Need more help?" section matching `5.png`.
- Full SEO metadata generation for service pages.

## Security Considerations
- Data is rendered safely without inline script injection.
- Booking requests do not process raw card details directly; customer state is keyed to authenticated user context where available.
- Public service pages are accessible without exposing private provider credentials.

## Acceptance Criteria
- [ ] Navigating to `/services/house-cleaning` or `/services/clean-your-home-living-spaces` renders the full page matching `5.png`.
- [ ] Clicking any service card in the app navigates cleanly to the service detail page.
- [ ] Switching packages updates the selected package and price in the booking card.
- [ ] Image gallery thumbnail clicking and arrow buttons switch the active hero image.
- [ ] Booking request form validates date and time and opens confirmation modal.
- [ ] Review search and filter work properly.
- [ ] FAQs expand and collapse on click.
- [ ] Type checks, lint, and Next.js production build pass cleanly.

## Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## Exact Manual Test Steps
1. Navigate to `http://localhost:3000/services/clean-your-home-living-spaces`.
2. Verify the desktop layout matches `.design/5.png` side-by-side.
3. Click through the thumbnail gallery and arrow buttons to verify image switching.
4. Toggle between `Regular`, `Deep`, and `Move-out` tabs in the booking sidebar -> verify price updates between `GH₵150`, `GH₵300`, and `GH₵400`.
5. Select a date and time, click `Request booking` -> verify confirmation modal opens.
6. Scroll down to `Compare packages` table -> click `Select` on `Deep Clean` -> verify sidebar reflects `Deep Clean`.
7. Click each FAQ item to verify smooth accordion expansion.
8. Test review search input by typing "thorough" -> observe filtered reviews.
