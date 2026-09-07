# Implementation Prompt: Comprehensive Provider Service Creation Flow

## Goal
Enable service providers to add and publish multiple services from their dashboard and public profile. Providers must be able to view all their existing services, click a prominent "+ Add Service" button, select categories, prices, and descriptions, and have the newly created services immediately published to Sanity and visible on their profile, in their category, and on `/search`.

---

## Skills Read
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`): Content schemas, document references, server-side mutations using write tokens, and revalidation patterns.
- Next.js App Router Documentation (`node_modules/next/dist/docs/`): Dynamic route parameters, URL search parameters (`useSearchParams`), server actions and API route handlers.

---

## Code Inspected
- `app/provider/dashboard/page.tsx`:
  - `data?.services` is returned by `/api/provider/dashboard-data` but was never rendered on the dashboard.
  - Tab navigation only had `overview`, `orders`, and `earnings`, with no dedicated `services` tab.
  - `isCreateServiceModalOpen` was only triggered if `serviceCompleted` was false in `VisibilityStepsCard`. Once an initial service existed, the button was replaced by static "Created" text with no way to add another service.
  - No handling of URL search parameter triggers like `?tab=services` or `?action=new-service`.
- `components/provider/visibility-steps-card.tsx`:
  - Step 2 ("Create your first service") hid the creation trigger completely when `serviceCompleted` was true.
- `components/provider/dashboard-modals.tsx` (`CreateServiceModal`):
  - Handled title, category, price, area, description, but had no loading state or image preview/upload.
- `app/api/provider/service/route.ts`:
  - Handled `POST` to create services, but didn't attach the provider's existing photo as `coverImage` when creating additional services.
- `components/provider/dashboard-header.tsx`:
  - "My Business ⌵" dropdown linked "Services & Packages" to `/provider/dashboard?tab=overview` instead of a dedicated services view, and had no direct "+ Add New Service" shortcut.
- `app/provider/profile/page.tsx`:
  - "+ Add Service" linked to `/provider/dashboard?tab=overview` without opening the modal.

---

## Decisions & Assumptions
1. **Dedicated "My Services" Tab & Overview Section**:
   - Add a "My Services" tab to the provider dashboard (`/provider/dashboard?tab=services`) displaying all published services with their status, category, pricing, and live listing link (`/services/[slug]`), along with a prominent `+ Add New Service` button.
   - On the Overview tab, render a "My Services" card showing active services and an "+ Add Service" button so providers can manage their offerings at a glance.
2. **Multi-Service Creation from Visibility Card**:
   - In `VisibilityStepsCard`, when `serviceCompleted` is true, show both the green "Created" badge AND a "+ Add Another Service" button so providers are never blocked from adding more trades.
3. **Seamless Modal Triggers**:
   - Support `action=new-service` or `addService=true` in dashboard URL search params so links from the profile page (`/provider/profile`) or header dropdown directly open the `CreateServiceModal`.
4. **Image & Profile Fallback**:
   - When creating a service in `POST /api/provider/service`, if no custom cover image is provided, automatically attach the provider's profile photo so new service cards display with professional imagery in search and category pages.
5. **Modal Experience**:
   - Upgrade `CreateServiceModal` to support asynchronous submission with loading feedback (`isSubmitting`) and inline error alerts if validation fails.

---

## Files to Touch
1. `[MODIFY]` `components/provider/visibility-steps-card.tsx`:
   - Add `+ Add Another Service` button when `serviceCompleted` is true.
2. `[MODIFY]` `components/provider/dashboard-modals.tsx`:
   - Enhance `CreateServiceModal` with async `onSave`, loading state, and error handling.
3. `[MODIFY]` `app/provider/dashboard/page.tsx`:
   - Add "My Services" tab to tab navigation with service count badge.
   - Add "My Services" section on Overview tab.
   - Render full "My Services & Packages" list view on `activeTab === "services"`.
   - Add URL parameter watcher (`action=new-service` or `addService=true`) to auto-open `CreateServiceModal`.
4. `[MODIFY]` `components/provider/dashboard-header.tsx`:
   - Add "+ Add New Service" option in "My Business" dropdown and point "Services & Packages" to `tab=services`.
5. `[MODIFY]` `app/provider/profile/page.tsx`:
   - Point "+ Add Service" link to `/provider/dashboard?tab=services&action=new-service`.
6. `[MODIFY]` `app/api/provider/service/route.ts`:
   - Auto-attach provider profile photo asset as `coverImage` when creating a service.
   - Revalidate `/provider/dashboard`, `/provider/profile`, and category paths.

---

## Security Considerations
- Authentication enforced via Clerk server-side `auth()`.
- Only the authenticated provider owning the profile can create services linked to their `providerProfile._id`.
- Sanity write operations use the server-side write token; no secrets or tokens reach the browser.

---

## Acceptance Criteria
- [ ] Providers can open the "+ Add Service" modal from the dashboard Overview card, the "My Services" tab, the header dropdown, and their public profile.
- [ ] Step 2 in `VisibilityStepsCard` includes "+ Add Another Service" even after the first service is created.
- [ ] The "My Services" tab displays all services created by the provider with title, category, price, and a link to the live service detail page.
- [ ] Submitting `CreateServiceModal` creates a published Sanity `service` document linked to the provider and category.
- [ ] Newly added services immediately appear on `/provider/dashboard`, `/provider/profile`, the category page, and `/search`.
- [ ] All checks (`npx tsc --noEmit`, `npm run lint`, `npm run build`) pass with 0 errors.

---

## Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

---

## Exact Manual Test Steps
1. Navigate to `http://localhost:3000/provider/dashboard`.
2. Notice the new "My Services" tab and the "My Services" section on the Overview tab with "+ Add New Service".
3. In `VisibilityStepsCard`, verify "+ Add Another Service" is visible and clickable.
4. Click "+ Add New Service", fill in:
   - Title: "Emergency Fuse & Socket Repair"
   - Category: "Electrical Repairs"
   - Price: 220
   - Description: "Prompt troubleshooting and replacement of blown fuses, circuit breakers, and burnt wall sockets."
   - Click "Create Service".
5. Verify toast confirms publication and the service appears immediately in the "My Services" list.
6. Click "View Live Listing →": verify it opens the service page at `/services/...`.
7. Navigate to `http://localhost:3000/categories/electrical-repairs` and `http://localhost:3000/search?q=fuse`: verify the newly added service appears with provider photo and price.
