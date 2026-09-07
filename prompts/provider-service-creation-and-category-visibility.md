# Implementation Prompt: Provider Service Creation and Category Visibility

## 1. Goal
Ensure that when a user becomes a provider, their service is immediately created, published, and available in their respective category so that customers can browse, view, and book it right away without manual friction or missing listings.

---

## 2. Skills Read
- `AGENTS.md` (sections 1, 2, 4, 5, 7, 8, 9, 11, 13)
- `sanity-best-practices`
- `content-modeling-best-practices`

---

## 3. Code Inspected
- `app/api/provider/profile/route.ts`:
  - Currently saves the `providerProfile` document to Sanity when a user completes onboarding, but does NOT create a `service` document. As a result, onboarded providers (like Cherith Tv) ended up with 0 services in Sanity, leaving their categories empty of their offerings.
- `app/api/provider/service/route.ts`:
  - Route for creating services from the provider dashboard. Needs to guarantee accurate category reference resolution and path revalidation.
- `components/provider/dashboard-modals.tsx`:
  - `CreateServiceModal` hardcoded `"house-cleaning"` as the default dropdown category instead of preselecting the provider's active trade.
- `app/categories/[slug]/page.tsx`:
  - `force-dynamic` page querying `*[_type == "service" && ... && status == "published"]`. Services with valid category references and published status render directly into `CategoryServicesList`.
- Sanity Inspection (`scripts/inspect-all.mjs`):
  - Verified Cherith Tv (`user_3IzuC3iqhPJ0iQaCbf7MnmuI2a7`) has an approved `providerProfile` with electrical skills, but 0 services in Sanity.

---

## 4. Decisions and Assumptions
- **Automatic Service Provisioning on Provider Onboarding**: When a user completes onboarding via `/api/provider/profile`, if they do not yet have an active service, automatically create an initial published service in Sanity matching their selected trade (e.g. Electrical Repairs, Plumbing, House Cleaning), starting price (default GHS 150), and selected skills as included tasks.
- **Immediate Backfill for Existing Providers**: Backfill an active published service for Cherith Tv and any other onboarded provider who currently has 0 services in Sanity.
- **Pre-select Provider Trade in Create Service Modal**: Pass the provider's primary trade into `CreateServiceModal` so new services automatically default to the provider's actual category.
- **Instant Category Page Revalidation**: In both `/api/provider/profile` and `/api/provider/service`, revalidate `/categories/[slug]`, the specific category route, `/`, and `/search` upon service creation.

---

## 5. Files Expected to Touch
- `app/api/provider/profile/route.ts`: Automatically create initial published service upon onboarding if no services exist for provider.
- `components/provider/onboarding-profile-view.tsx`: Pass trade and starting price context.
- `components/provider/dashboard-modals.tsx`: Pre-select provider's trade in `CreateServiceModal`.
- `app/provider/dashboard/page.tsx`: Pass provider trade category to `CreateServiceModal`.
- `scripts/backfill-provider-services.mjs`: Script to backfill Cherith Tv and existing providers with 0 services.

---

## 6. Requirements
1. When a user becomes a provider and completes onboarding:
   - Their `providerProfile` is saved in Sanity.
   - An initial `service` listing is automatically created in Sanity with `status: 'published'`.
   - The service is linked to the matching `category` reference (e.g., Electrical Repairs, Plumbing, Cleaning, etc.).
   - The service is linked to the provider's `providerProfile` reference.
   - The service is immediately queryable and visible on `/categories/[slug]` (e.g., `/categories/electrical-repairs`).
2. Existing onboarded providers with 0 services (such as Cherith Tv) are immediately provisioned with their published service.
3. Dashboard service creation (`CreateServiceModal`) defaults to the provider's trade and successfully publishes new services with category linking.

---

## 7. Security Considerations
- All Sanity writes use server-side `getServerClient({ useWriteToken: true })` inside authenticated API routes (`auth()` check).
- No write tokens are exposed to the client.
- Users can only create or manage services for their own authenticated Clerk provider profile.

---

## 8. Acceptance Criteria
- `npx tsc --noEmit` passes with 0 errors.
- `npm run lint` passes with 0 errors.
- `npm run build` succeeds.
- Cherith Tv's electrical service is published in Sanity and displayed when visiting `/categories/electrical-repairs` (or `/categories/electrical`).
- Any new user who completes onboarding immediately has their published service appear in their category.

---

## 9. Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- Run query script verifying service counts for providers and categories in Sanity.

---

## 10. Exact Manual Test Steps
1. Navigate to `/categories/electrical-repairs` (or `/categories/electrical`) and verify Cherith Tv's Electrical Repairs service is displayed with price, title, and provider badge.
2. Sign in as a customer or new user and click "Become a Provider".
3. Select a trade (e.g. "Plumbing" or "Painting & Decorating") and complete the profile onboarding.
4. Click "Save & Continue to Dashboard".
5. Visit the category page matching your selected trade (e.g. `/categories/plumbing` or `/categories/painting-decorating`).
6. Verify your new service card appears immediately in that category list with your name and details.
