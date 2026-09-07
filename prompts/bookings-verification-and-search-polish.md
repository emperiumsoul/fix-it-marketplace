# Implementation Prompt: Real Bookings Flow, Provider Verification Queue, and Search Page Polish

## Goal
Implement three essential marketplace operational features:
1. **Real Bookings Flow**: Create a secure `/api/bookings` route handler so that when a customer books a service (via `ServiceBookingModal`), a live Sanity `booking` document is created that links the customer and provider, immediately surfacing in the provider's "Orders Received" tab on `/provider/dashboard` and in the customer's `/bookings` page.
2. **Provider Verification Queue**: Update provider identity submission so that uploading a Ghana Card marks verification as `pending` instead of instantly auto-verifying. This routes the submission into the admin moderation queue on `/admin` where administrators can review, approve (`verified`), or reject (`unverified`).
3. **Search Page Polish**: Remove the hardcoded sample tag on `/search`, display real provider verification badges, and show genuine rating/review data derived from the provider record.

---

## Skills Read
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`): Schema validation, GROQ query patterns, references vs. embedded objects, server-side Sanity client with write tokens.
- Next.js App Router Documentation (`node_modules/next/dist/docs/`): Server route handlers, authentication via Clerk server helpers (`auth()`, `currentUser()`), route revalidation.

---

## Code Inspected
- `studio/schemaTypes/documents/booking.ts`:
  - `_type`: `'booking'`
  - Required fields: `customer` (ref `customerProfile`), `customerClerkUserId`, `provider` (ref `providerProfile`), `providerClerkUserId`, `service` (ref `service`), `agreedPrice`, `currency`, `scheduledTime`, `serviceAddress`, `jobStatus`, `paymentStatus`.
- `components/service-detail/service-booking-modal.tsx`:
  - Currently saves only to `localStorage` (`fixit_customer_bookings` and `fixit_provider_orders`).
- `components/service-detail/service-detail-view.tsx` & `app/services/[slug]/page.tsx`:
  - `raw.provider` queries in `app/services/[slug]/page.tsx` need `_id` and `clerkUserId` so `ServiceBookingModal` receives real IDs.
- `app/api/provider/dashboard-data/route.ts`:
  - Queries `*[_type == "booking" && (provider->clerkUserId == $userId || provider._ref == $profileId || providerClerkUserId == $userId)]`.
- `components/bookings/bookings-view.tsx`:
  - Initializes from `localStorage` or initial mock data; needs to fetch `/api/bookings` to load the customer's live Sanity bookings.
- `app/api/provider/verify-identity/route.ts`:
  - Currently sets `verificationStatus: 'verified'` and `verified: true` directly. Needs to set `verificationStatus: 'pending'` and `verified: false`.
- `app/admin/page.tsx` & `app/api/admin/providers/route.ts`:
  - Already has complete filtering for "Pending Review" (`statusFilter === 'pending'`) and moderation action buttons to update provider status via `PATCH /api/admin/providers`.
- `app/search/page.tsx` & `components/cards/service-card.tsx`:
  - `app/search/page.tsx` needs to pass `isVerified={service.provider?.verificationStatus === 'verified' || service.provider?.verified === true}`, `isSample={false}`, and real rating data to `ServiceCard`. Default `isSample` in `ServiceCard` should default to `false`.

---

## Decisions & Assumptions
1. **Server-Side Sanity Write Token**: All mutations (`POST /api/bookings`, `PATCH /api/bookings`, `POST /api/provider/verify-identity`) execute server-side using `getServerClient({ useWriteToken: true })`. No tokens are exposed to the client.
2. **Customer Profile Resolution**: When creating a booking, `/api/bookings` checks if the customer already has a `customerProfile` in Sanity for their `clerkUserId`. If not, it creates one on the fly using their Clerk details (name, email).
3. **Provider Reference Resolution**: In `POST /api/bookings`, the handler looks up the service document by `serviceId` or `slug` to safely resolve the exact Sanity document references: `service: { _ref }`, `provider: { _ref }`, and `providerClerkUserId`. This prevents forged provider IDs or invalid references.
4. **Immediate Provider Visibility**: Once the booking is created in Sanity, when the provider visits `/provider/dashboard` and checks the "Orders Received" tab, `/api/provider/dashboard-data` queries the live booking and surfaces it immediately.
5. **Booking Status Updates**: `/api/bookings` also supports `PATCH` so authorized providers or customers can update status (e.g. mark confirmed, in progress, completed, or cancelled).
6. **Pending Identity Verification**: Submitting the Ghana Card modal sets `verificationStatus: 'pending'` and `verified: false`. The provider's dashboard reflects "In Review", and the admin dashboard `/admin` shows the provider under "Pending Review" ready for approval.

---

## Files to Touch
1. `[NEW]` `app/api/bookings/route.ts`: Server route handling `POST` (create booking with customer profile resolution & service lookup), `GET` (fetch user's bookings), and `PATCH` (update status).
2. `[MODIFY]` `components/service-detail/types.ts`: Ensure `id`, `provider.id`, and `provider.clerkUserId` are typed.
3. `[MODIFY]` `app/services/[slug]/page.tsx`: Include `_id` and `clerkUserId` in `provider->` GROQ projection and pass them into `serviceData`.
4. `[MODIFY]` `components/service-detail/service-detail-view.tsx`: Pass `serviceId`, `serviceSlug`, `providerId`, `providerClerkUserId` to `ServiceBookingModal`.
5. `[MODIFY]` `components/service-detail/service-booking-modal.tsx`: Call `POST /api/bookings` with validated payload, await real Sanity response, and handle success/error states gracefully.
6. `[MODIFY]` `components/bookings/bookings-view.tsx`: Fetch live customer bookings from `GET /api/bookings` and merge/display real Sanity documents with status indicators.
7. `[MODIFY]` `app/api/provider/verify-identity/route.ts`: Set `verificationStatus: 'pending'` and `verified: false` to place into admin review queue.
8. `[MODIFY]` `app/provider/dashboard/page.tsx`: Update verification toast and message to reflect submission for admin review.
9. `[MODIFY]` `app/search/page.tsx`: Query `verified` in provider projection, pass `isVerified` and `isSample={false}` with rating to `ServiceCard`.
10. `[MODIFY]` `components/cards/service-card.tsx`: Change default `isSample` to `false`.

---

## Security Considerations
- Authentication is enforced with Clerk server-side `auth()`. Unauthenticated requests return `401 Unauthorized`.
- Authorization: In `PATCH /api/bookings`, only the customer or provider associated with the booking (or platform admin) is permitted to update the booking status.
- Sensitive customer data: Private service address is stored in the booking record and never exposed to public search or unauthenticated users.
- Verification moderation: Only verified platform administrators (`checkAdminAccess()`) can promote a provider from `pending` to `verified` in `/api/admin/providers`.

---

## Acceptance Criteria
- [ ] Submitting a booking in `ServiceBookingModal` creates a valid `booking` document in Sanity via `POST /api/bookings`.
- [ ] The newly created booking immediately appears in `/provider/dashboard` under the "Orders Received" tab.
- [ ] The customer's `/bookings` page displays the newly created booking with status "Requested" and accurate agreed package details.
- [ ] Submitting the Ghana Card modal sets `verificationStatus: 'pending'`, showing "In Review" on the provider dashboard.
- [ ] The provider appears in the admin dashboard (`/admin`) under the "Pending Review" filter with a "Verify Provider" button.
- [ ] Approving the provider in `/admin` sets their status to `verified` and unlocks the verified shield badge across their profile and service cards.
- [ ] The search page (`/search`) displays real verified badges and does not show "Sample listing".
- [ ] All checks (`npx tsc --noEmit`, `npm run lint`, `npm run build`) pass with 0 errors.

---

## Checks to Run
- `npx tsc --noEmit` (TypeScript type check)
- `npm run lint` (ESLint validation)
- `npm run build` (Next.js production build verification)

---

## Exact Manual Test Steps
1. **Search Polish Test**:
   - Navigate to `http://localhost:3000/search`.
   - Verify that service cards display real prices and no cards contain the "Sample listing" badge.
   - Verify that verified providers display the green shield badge.
2. **Provider Verification Queue Test**:
   - Log in as a provider and navigate to `/provider/dashboard`.
   - Click "Verify Identity", input a Ghana Card number (e.g. `GHA-123456789-0`), and submit.
   - Verify toast message says identity submitted for admin review, and badge indicates "In Review".
   - Navigate to `/admin` as an admin user.
   - Check the "Pending Review" tab: verify the provider appears with "Pending Review" status.
   - Click "Verify Provider": verify status updates to "Verified" with green badge.
3. **Real Bookings Flow Test**:
   - Navigate to any service page (e.g. `http://localhost:3000/services/...`).
   - Select a package and date/time, enter a Ghana address in the modal, and submit booking.
   - Verify the success screen shows the real Sanity booking reference.
   - Go to `/bookings` as customer: verify the booking is listed under "Requested".
   - Go to `/provider/dashboard?tab=orders` as the provider: verify the booking appears in "Orders Received" with customer name, agreed price, and requested status.
