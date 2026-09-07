# Implementation Prompt: Category Services Display & Admin Verification Dashboard

## Goal
1. Resolve the category page defect where all categories (e.g., Electrical Repairs, Plumbing) displayed hardcoded cleaning data and did not list actual services published in that category.
2. Build an Admin Dashboard (`/admin`) allowing administrators to review registered providers, verify Ghanaian identity credentials (Ghana Card), manage provider verification status, and manage service publication.
3. Display the "Verified Provider" badge across service cards on category pages, search results, and provider profiles once a provider is verified.

## Skills Read
- `sanity-best-practices`
- `node_modules/next/dist/docs/` (App Router Route Handlers, Server Components, and mutations)

## Code Inspected
- `app/categories/[slug]/page.tsx`: Does not fetch `service` records from Sanity. Directly renders `ExploreGrid`, `PopularSubcategories`, `CategoryFAQs`, and `CategoryTags` which only contain hardcoded cleaning data.
- `components/category/explore-grid.tsx`: Only contains `DEFAULT_CLEANING_EXPLORE_CARDS`.
- `components/category/popular-subcategories.tsx`: Only contains `DEFAULT_CLEANING_ITEMS`.
- `components/category/category-faqs.tsx`: Contains hardcoded cleaning FAQs.
- `components/category/category-tags.tsx`: Contains hardcoded cleaning tags.
- `components/cards/service-card.tsx`: Lacks an `isVerified` prop and verified shield badge.
- `studio/schemaTypes/documents/provider-profile.ts`: Contains `verificationStatus` (`unverified`, `pending`, `verified`) and `verified` boolean.
- No `/admin` page or admin API route exists in the workspace.

## Decisions and Assumptions
1. **Dynamic Category Pages**:
   - Query published services for the requested category from Sanity (`*[_type == "service" && (category->slug.current == $slug || category->slug.current == $mappedSlug || category._ref == $category._id) && status == "published"]`).
   - Add a dedicated "Available Services in [Category]" section directly below the hero banner, rendering interactive `ServiceCard`s linking to `/services/[slug]`.
   - Provide tailored category data mappings for all Ghanaian marketplace categories: Electrical Repairs, Plumbing, Painting & Decorating, Moving & Relocation, Gardening & Landscaping, Furniture Assembly, Appliance & Home Repairs, and House Cleaning.
2. **Admin Verification Dashboard (`/admin`)**:
   - Create a clean, modern Admin Dashboard with overview metrics (Total Providers, Verified Providers, Pending Review, Total Services).
   - **Provider Management Tab**: Lists all providers with display name, Clerk user ID, primary trade, identity verification status, and Ghana Card details. Includes one-click actions: "Approve / Verify", "Mark In Review", and "Revoke Verification".
   - **Services Management Tab**: Lists all services with title, provider name, category, starting price (GHS), and publication status (`published` / `draft`), with one-click toggle to Publish or Unpublish.
   - Mutations go through secure server route handlers (`/api/admin/providers` and `/api/admin/services`) using the Sanity write token.
3. **Verified Badge Display**:
   - Update `ServiceCard` in `components/cards/service-card.tsx` to accept `isVerified?: boolean` and display a green `Verified` badge with a checkmark next to the provider name.
   - When an admin verifies a provider, their badge instantly appears across category service listings, search results, and provider profiles.

## Files to Touch
1. `app/categories/[slug]/page.tsx` [MODIFY]: Query published services and pass dynamic category-specific data.
2. `components/category/category-services-list.tsx` [NEW]: Section displaying published service cards or an empty state for the category.
3. `components/category/category-data-presets.ts` [NEW]: Category-specific dictionaries for subcategories, exploration cards, FAQs, and tags (Electrical, Plumbing, Cleaning, Painting, Moving, Gardening, Assembly, Home Repairs).
4. `components/category/explore-grid.tsx` [MODIFY]: Accept dynamic cards matching the category.
5. `components/category/popular-subcategories.tsx` [MODIFY]: Accept dynamic subcategories matching the category.
6. `components/category/category-faqs.tsx` [MODIFY]: Accept dynamic FAQs matching the category.
7. `components/category/category-tags.tsx` [MODIFY]: Accept dynamic tags matching the category.
8. `components/cards/service-card.tsx` [MODIFY]: Add `isVerified` prop and render green verified badge.
9. `app/admin/page.tsx` [NEW]: Admin dashboard page for provider verification and service management.
10. `app/api/admin/providers/route.ts` [NEW]: Server route to fetch and update provider verification statuses.
11. `app/api/admin/services/route.ts` [NEW]: Server route to fetch and update service publication statuses.
12. `components/navigation/public-header.tsx` [MODIFY]: Add Admin link in user menu for easy navigation.

## Security Considerations
- All Sanity write operations are executed server-side with `SANITY_API_WRITE_TOKEN`.
- Clerk `auth()` verifies user session before allowing admin mutations.
- Private document assets are kept out of public search result projections.

## Acceptance Criteria
- Navigating to `/categories/electrical-repairs` displays electrical-specific hero, popular subcategories (Wiring, Breakers, Lighting), electrical explore cards, electrical FAQs, and actual published electrical services.
- Category services list shows real cards with provider name, GHS price, and verified status.
- Admin dashboard at `/admin` lists providers, allows one-click verification approval (`verified: true`), and lists services with publish toggles.
- Verified providers display the green "Verified" badge on their service cards and profile.

## Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## Manual Test Steps
1. Visit `http://localhost:3000/categories/electrical-repairs` and confirm all content is specific to Electrical Repairs (no generic house cleaning text).
2. Check that any published electrical services appear in the "Available Services" section.
3. Navigate to `http://localhost:3000/admin`.
4. Locate your provider in the Providers list; review their status and click **Verify Provider**.
5. Return to the category or search page and verify that the provider's service card now displays the green **Verified** badge.
6. Check that services can be published or drafted from the Services tab in `/admin`.
