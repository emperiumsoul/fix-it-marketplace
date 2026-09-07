# Fix it — Real Provider Profiles, Photo Upload, Dynamic Service Publishing & Dashboard

## 1. Goal
Transition the provider experience from static dummy/mock data to dynamic, real-world data backed by Sanity and Clerk:
1. Provider profiles start empty with no pre-filled fake data (e.g. no fake "Plumbing - 4.9 (28 completed jobs)" or pre-filled work histories).
2. Providers can upload a real profile photo directly to Sanity via an image upload route.
3. Providers can easily view and change their trade category, services, and profile details.
4. The provider dashboard dynamically renders real data:
   - Orders/Bookings: Reflects actual customer orders from Sanity (showing 0 and clean empty state when none have been received).
   - Earnings & Payouts: Reflects actual GHS balances and transaction history derived from completed orders (GHS 0.00 when new).
   - Service Publishing & Visibility Steps: Dynamically tracks whether the provider has provided all required details and created a published service before unlocking live marketplace visibility.

---

## 2. Skills Read
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`): Asset uploads (`client.assets.upload`), image references with hotspot, GROQ projections, handling draft/published services and provider profiles.
- `Next.js App Router Route Handlers` (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md`): Form-data file handling, server-side Sanity mutations with write token, Clerk server `auth()`.

---

## 3. Code Inspected
- `app/provider/dashboard/page.tsx`: Contains hardcoded "5 Customer Orders", "GHS 882.00 Available", static badges, and mock guide/service completion flags.
- `components/provider/orders-list-view.tsx`: Uses static `INITIAL_ORDERS` array with fake customer bookings.
- `components/provider/earnings-view.tsx`: Uses static `882 GHS` balance and fake transaction list.
- `components/provider/dashboard-profile-banner.tsx`: Displays fallback initial and static labels.
- `app/provider/profile/page.tsx`: Contains hardcoded 4.9 rating, 28 completed jobs, hardcoded starting price, and fallback plumbing packages.
- `components/provider/onboarding-profile-view.tsx`: Initialized with dummy "Clear" and "Plumbing", lacking direct image upload to Sanity.
- `studio/schemaTypes/documents/provider-profile.ts`: Has `photo` (image field with hotspot and alt text), `expertise`, `bio`, `serviceAreas`.
- `studio/schemaTypes/documents/service.ts`: Top-level listing referencing `providerProfile` and `category`.

---

## 4. Decisions and Assumptions
1. **Server Route for Asset Uploads**: In compliance with `AGENTS.md`, write tokens never reach the browser. Image uploads go to `POST /api/upload/image` (Next.js server Route Handler with `formData`), which streams the file to Sanity's Asset API using `getServerClient({ useWriteToken: true }).assets.upload('image', ...)`.
2. **Dynamic Dashboard Data Route**: Create `GET /api/provider/dashboard-data` which authenticates the provider via Clerk and fetches their real `providerProfile`, real services, and real `booking` documents from Sanity.
3. **Zero State & No Dummy Defaults**:
   - New providers have 0 orders, 0 GHS earnings, 0 completed jobs, and "New Provider" badge.
   - If bio, headline, or packages have not been provided by the provider, the profile renders clean empty states prompting them to add their details, instead of fabricated placeholder text.
4. **Service Publishing Requirements**:
   - A service requires title, category, description, service areas, and starting price or package before it can be published and marked complete in the dashboard's "Steps to get visible".
5. **Photo Upload UI**: Add a file input with preview in `onboarding-profile-view.tsx` and `app/provider/profile/page.tsx` allowing providers to upload and update their profile picture, instantly updating Sanity.

---

## 5. Files to Create and Touch
- `[NEW]` `app/api/upload/image/route.ts`: Server route handler for image asset upload to Sanity with write token.
- `[NEW]` `app/api/provider/dashboard-data/route.ts`: Server route handler fetching real provider profile, services, and bookings from Sanity.
- `[NEW]` `app/api/provider/service/route.ts`: Server route handler to create/update published services for the authenticated provider in Sanity.
- `[MODIFY]` `components/provider/onboarding-profile-view.tsx`: Add photo upload with live preview, remove hardcoded "Clear"/"Plumbing" defaults, allow selecting any trade service, and sync to Sanity.
- `[MODIFY]` `app/provider/profile/page.tsx`: Display real provider data (photo, bio, skills, actual rating/jobs count, services), removing hardcoded 4.9 rating / 28 jobs / fake text.
- `[MODIFY]` `app/provider/dashboard/page.tsx`: Connect to `/api/provider/dashboard-data`, dynamically render real orders count, real earnings, and live visibility steps.
- `[MODIFY]` `components/provider/orders-list-view.tsx`: Accept dynamic orders list and render real bookings or an empty orders state.
- `[MODIFY]` `components/provider/earnings-view.tsx`: Accept dynamic earnings data and render real GHS balances or zero state.
- `[MODIFY]` `components/provider/dashboard-profile-banner.tsx`: Display real provider avatar photo from Sanity.

---

## 6. Requirements
1. **Empty State & Real Data Integrity**:
   - Provider profile contains no fabricated reviews, ratings, completed job counts, or descriptions.
   - Only data entered by the provider or recorded from real bookings is displayed.
2. **Profile Photo Upload**:
   - Providers can choose an image file (JPEG, PNG, WebP), preview it, and upload it.
   - The image is stored as an asset in Sanity and linked to `providerProfile.photo`.
3. **Change Trade / Service**:
   - Providers can change their primary trade, headline, bio, skills, and service areas at any time.
4. **Real Dashboard Activity**:
   - Orders tab displays actual customer bookings matching `provider->clerkUserId == userId`. If none, shows zero count and friendly empty state.
   - Earnings tab displays actual accumulated earnings in GHS. If none, shows GHS 0.00.
   - Dashboard "Steps to get visible" step 2 updates to completed once a service is saved to Sanity.

---

## 7. Security Considerations
- All file uploads are validated for image MIME types (`image/jpeg`, `image/png`, `image/webp`) and size limits (< 5MB).
- `auth()` ensures only the authenticated user can upload assets and mutate their own profile and services.
- Private read and write tokens remain strictly server-side.

---

## 8. Acceptance Criteria
- [ ] Provider profile page displays real photo and actual entered details, with 0 fake ratings/jobs when fresh.
- [ ] Provider can upload a photo and it saves to Sanity Studio under the provider's document.
- [ ] Provider can switch or update their trade/service.
- [ ] Dashboard displays dynamic order count (0 when new) and dynamic earnings (GHS 0.00 when new).
- [ ] When a service is created in Sanity, the dashboard visibility step reflects "Created".
- [ ] TypeScript and ESLint pass with 0 errors.

---

## 9. Checks to Run
1. TypeScript check: `npx tsc --noEmit`
2. ESLint: `npm run lint`
3. Production build check: `npm run build`

---

## 10. Manual Test Steps
1. Navigate to `http://localhost:3000/provider/dashboard`. Verify it shows 0 customer orders and GHS 0.00 available when no bookings exist.
2. Navigate to `http://localhost:3000/provider/onboarding` (or click "Edit Profile").
3. Upload a profile photo, select a trade category (e.g. Electrical Repairs or House Cleaning), enter custom headline and bio, and click Save.
4. View `http://localhost:3000/provider/profile` and confirm your uploaded photo and real details display without dummy text.
5. In Sanity Studio (`http://localhost:3333`), open **Public Marketplace -> Provider Profiles**, verify the photo asset and updated fields appear.
