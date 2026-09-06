# Implementation Prompt: Dynamic Category and Provider Data for Service Detail Page

## Goal
Ensure the Service Detail Page layout (`5.png`) dynamically adapts to every category and provider across the marketplace (Plumbing, Electrical, Painting, Moving, Gardening, Furniture Assembly, Cleaning), rather than hardcoding cleaning as the default content for all services.

## Skills Read
- `sanity-best-practices`
- Next.js dynamic routes & server-side Sanity GROQ fetching

## Code Inspected
- `app/services/[slug]/page.tsx`: Previously only queried basic metadata and passed hardcoded fallback props to `ServiceDetailView`.
- `components/service-detail/*`: Components contained hardcoded static strings for cleaning, Neat Home, cleaning FAQs, cleaning gallery, and GH₵150/300/400 packages.
- Sanity database records via `scripts/check-services.mjs`: Confirmed 12 rich services exist across Plumbing (Kwame Mensah), Electrical (Kofi Boateng), Painting (Emmanuel Addo), Moving (SwiftHaul), Gardening (Yaw Osei), and Cleaning (Akosua CleanCo & Neat Home) with real package pricing, inclusions, exclusions, and FAQs.

## Decisions and Assumptions
1. **Full Sanity Data Injection**:
   - `app/services/[slug]/page.tsx` will execute a comprehensive GROQ query fetching:
     - `title`, `slug`, `summary`, `description`, `startingPrice`, `currency`, `serviceAreas`, `includedTasks`, `exclusions`
     - `coverImage` & `gallery`
     - `packages[]` (name, price in GHS, description, scope, includedTasks, exclusions, duration)
     - `faqs[]` (question, answer)
     - `category` (title, slug)
     - `provider` (displayName, headline, bio, expertise, languages, serviceAreas, availability, photoUrl, portfolio)
     - Related services in the same category or marketplace for recommendations
2. **Category-Tailored Visuals & Badges**:
   - **Hero Gallery & Badge**: Dynamic badge headline, category tagline, and 3 trade highlights matching the service category (e.g. Plumbing: "Plumbing repairs / Fast leak mitigation & pipe fittings", Electrical: "Electrical diagnostics / Safe circuits & inverter setups", Painting: "Interior & exterior painting / Crisp finishes & surface prep", Moving: "Moving & transport / Careful packing & safe haulage", Gardening: "Garden & compound care / Neat lawns & trimming", Cleaning: "Home cleaning / A cleaner home. A happier you.").
   - **Gallery Images**: Use the service's uploaded images, supplemented with high-resolution trade photos.
   - **Highlights Row**: Inferred or provided trade highlights (e.g. emergency response, quality guarantee, date/time scheduling).
3. **Dynamic Packages & Inclusions**:
   - Booking sidebar tabs and comparison table rows dynamically adapt to the service's actual package count (typically 2 to 3 packages) with their real names, real prices in GH₵, descriptions, and feature matrices.
4. **Dynamic Provider Profile & Portfolio**:
   - Displays real provider photo/avatar, trade icon, display name, headline, bio, spoken languages, and actual recent projects.
5. **Dynamic Testimonial & Customer Reviews**:
   - Review spotlights and customer reviews reflect realistic local feedback for that trade and provider in Ghana (e.g. Accra, Cantonments, Kumasi, Tema, East Legon).
6. **Graceful Fallbacks**:
   - If a custom or mock slug is opened, provide category-matched fallbacks for all trades so no page ever shows broken fields or incorrect categories.

## Files Expected to Touch
- `app/services/[slug]/page.tsx`
- `components/service-detail/service-detail-view.tsx`
- `components/service-detail/service-gallery.tsx`
- `components/service-detail/service-about.tsx`
- `components/service-detail/service-provider-card.tsx`
- `components/service-detail/service-recent-projects.tsx`
- `components/service-detail/service-package-comparison.tsx`
- `components/service-detail/service-booking-sidebar.tsx`
- `components/service-detail/service-reviews.tsx`
- `components/service-detail/service-faqs.tsx`
- `components/service-detail/service-related-tags.tsx`
- `components/service-detail/service-recommendations.tsx`

## Requirements
- Maintain the exact desktop and mobile responsive layout, styling, typography, spacing, and interaction states from `.design/5.png`.
- Replace all hardcoded cleaning text with dynamic data corresponding to the service and provider being viewed.
- Plumbing services must showcase plumbing imagery, Kwame Mensah, pipe/leak packages, and plumbing FAQs.
- Electrical services must showcase electrical imagery, Kofi Boateng, electrical packages, and electrical FAQs.
- Painting, Moving, Gardening, and Cleaning services must similarly showcase their respective providers and content.

## Security Considerations
- Read token is kept strictly on the server in `app/services/[slug]/page.tsx`.
- Client components only receive sanitized data objects.

## Acceptance Criteria
- [ ] Navigating to `/services/sample-residential-plumbing-leak-repair` renders Kwame Mensah Plumbing Services, plumbing packages (GH₵180, GH₵350, GH₵650), and plumbing details.
- [ ] Navigating to `/services/sample-electrical-fault-finding-repairs` renders Kofi Boateng Electrical, electrical packages, and electrical details.
- [ ] Navigating to `/services/sample-interior-exterior-painting` renders Emmanuel Addo Painting, painting packages, and painting details.
- [ ] Navigating to `/services/sample-residential-moving-transport` renders SwiftHaul Relocations, moving packages, and moving details.
- [ ] Navigating to `/services/clean-your-home-living-spaces` or `/services/sample-deep-home-cleaning-sanitization` renders the cleaning experience matching `5.png`.
- [ ] All checks (`npx tsc --noEmit`, `npm run lint`, `npm run build`) pass.

## Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## Exact Manual Test Steps
1. Navigate to `http://localhost:3000/services/sample-residential-plumbing-leak-repair`.
2. Verify that the title, provider ("Kwame Mensah Plumbing Services"), location, packages (GH₵180, GH₵350, GH₵650), and FAQs are all plumbing-specific.
3. Navigate to `http://localhost:3000/services/sample-electrical-fault-finding-repairs`.
4. Verify that the title, provider ("Kofi Boateng Electrical & Power Solutions"), and electrical packages are displayed.
5. Navigate to `http://localhost:3000/services/clean-your-home-living-spaces`.
6. Verify that the original flagship cleaning page matching `5.png` remains intact.
