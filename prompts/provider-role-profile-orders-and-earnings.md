# Implementation Prompt: Provider Role, Profile View, Orders & Earnings Checking

## 1. Goal
Implement the 4 requested marketplace capabilities:
1. **Email-Derived Customer Name & Persistent Role**: When logging in via email as a customer, dynamically derive the greeting name from the user's email address (e.g. `emman@...` -> `Emman`), remembering the role selection without re-prompting.
2. **"Become a Provider" Activation**: Clicking "Become a Provider" in the header immediately activates the provider role and launches the onboarding profile creation flow at `/provider/onboarding`.
3. **Provider Profile View**: Implement `/provider/profile` allowing the service provider to view their complete public profile (bio, trades, services with GHS pricing, certifications, portfolio, and reviews) with an "Edit Profile" link back to onboarding.
4. **Order & Earnings Checking on Provider Dashboard**: Add dedicated interactive views on `/provider/dashboard` for checking received customer orders (with real-time job status updating: requested, confirmed, in progress, completed, cancelled) and checking earnings (total revenue, escrow balance, MoMo payout config, and transaction history), wired to the header navigation (`Bookings ⌵` and `Earnings ⌵`).

---

## 2. Skills & Standards Referenced
- `sanity-best-practices`: Adhering to structured schemas for bookings, provider profiles, and services.
- `AGENTS.md`: Keeping server/client boundaries clean, storing Ghana marketplace currency in GHS, preserving private addresses outside public search, checking roles and authorizations, running TypeScript/lint/build checks.

---

## 3. Code Inspected
- `components/welcome/personalized-homepage.tsx`: Identified fallback to `"Kingsley"` when user signs up via email without an explicit `firstName`.
- `components/welcome/role-modal.tsx`: Inspected role persistence logic via Clerk `user.unsafeMetadata` and `localStorage`.
- `components/navigation/public-header.tsx`: Found "Become a Provider" desktop and mobile links using `#become-a-provider` anchor placeholder.
- `components/provider/dashboard-header.tsx`: Inspected `Bookings ⌵`, `Earnings ⌵`, and `My Business ⌵` dropdown items.
- `components/provider/dashboard-profile-banner.tsx`: Inspected "View profile" link currently pointing to `/provider/onboarding`.
- `app/provider/dashboard/page.tsx`: Existing dashboard holding Profile Strength and Visibility Steps.
- `studio/schemaTypes/documents/booking.ts`: Verified fields for bookings: customer, provider, service, agreedPrice (GHS), scheduledTime, serviceAddress, jobStatus, paymentStatus.
- `scripts/seed-operations-and-search.mjs`: Inspected seeded bookings and Ghanaian provider profiles.

---

## 4. Key Decisions & Assumptions
1. **Name Extraction Algorithm**:
   - Extract the local part of `user.primaryEmailAddress.emailAddress` or `user.emailAddresses[0].emailAddress`.
   - Strip digits and delimiters (`.`, `_`, `-`), capitalize tokens: e.g. `emman@...` -> `Emman`, `kwame.boateng@...` -> `Kwame Boateng`.
   - Use this name on the welcome header (`Welcome to Fix it, [Name]`) and store it in user metadata when customer role is selected.
2. **"Become a Provider" Behavior**:
   - Updates `user.unsafeMetadata.role = 'provider'` and `localStorage.setItem('fixit_role', 'provider')`.
   - Redirects directly to `/provider/onboarding` so the user immediately starts setting up their provider profile.
3. **Provider Profile Page (`/provider/profile`)**:
   - Standalone, high-fidelity profile view showing:
     - Verified provider badge & Ghanaian location
     - Star rating & completed jobs count
     - Professional headline & bio
     - Services & package pricing in GHS
     - Portfolio showcase
     - Work experience, Education, and Certifications
     - Direct button to edit profile (`/provider/onboarding`) or return to `/provider/dashboard`.
4. **Orders & Earnings Tabs on Dashboard (`/provider/dashboard`)**:
   - Introduce tabbed views on the dashboard: `Overview`, `Orders Received`, `Earnings & Payouts`.
   - **Orders Received**:
     - Status filters (`All`, `Requested`, `Confirmed`, `In Progress`, `Completed`, `Cancelled`).
     - Display customer name, service & package, scheduled date, private address, price in GHS.
     - Interactive status transition actions (e.g. Accept request, start work, complete job).
     - Pre-populated with realistic orders so the provider can test immediately.
   - **Earnings & Payouts**:
     - Metric cards: Total Earned (GHS), Pending in Escrow (GHS), Available for Payout (GHS).
     - Mobile Money Payout settings (MTN MoMo, Telecel Cash).
     - Transaction ledger with fee breakdown (gross, 10% platform fee, net payout).
   - Top nav items in `DashboardHeader` (`Bookings ⌵` and `Earnings ⌵`) switch directly to these respective views.

---

## 5. Files to Touch
1. `components/welcome/personalized-homepage.tsx` [MODIFY]: Add email-derived name parser and ensure role persistence.
2. `components/welcome/role-modal.tsx` [MODIFY]: Save extracted customer name into metadata when customer role is chosen.
3. `components/navigation/public-header.tsx` [MODIFY]: Wire "Become a Provider" (desktop & mobile) to switch role and navigate to `/provider/onboarding`.
4. `components/provider/dashboard-header.tsx` [MODIFY]: Wire `Bookings ⌵` (Orders Received), `Earnings ⌵` (Earnings & Payouts), and `My Business ⌵` (View Public Profile -> `/provider/profile`).
5. `components/provider/dashboard-profile-banner.tsx` [MODIFY]: Point "View profile" link to `/provider/profile`.
6. `app/provider/profile/page.tsx` [NEW]: Provider public profile view page.
7. `components/provider/orders-list-view.tsx` [NEW]: Order received list with filtering, customer info, and status management.
8. `components/provider/earnings-view.tsx` [NEW]: Earnings metrics, MoMo payout configuration, and transaction history.
9. `app/provider/dashboard/page.tsx` [MODIFY]: Integrate tabs (`overview`, `orders`, `earnings`) and handle deep-linking via query parameters (`?tab=orders`, `?tab=earnings`).

---

## 6. Security & Safety Considerations
- Customer exact service delivery addresses are restricted to the authenticated provider's private dashboard/orders view and never leaked into public search.
- Financial records and earnings values are calculated strictly server/component-side without client tampering.
- Role switching keeps state safely namespaced in Clerk `unsafeMetadata` and local storage.

---

## 7. Acceptance Criteria
- [x] If user logs in with an email and chooses customer, their name on the welcome page comes from their email prefix and persists.
- [x] Clicking "Become a Provider" in the header switches role to provider and navigates directly to `/provider/onboarding`.
- [x] Provider can click "View profile" to see their full profile view at `/provider/profile`.
- [x] Provider can check received orders on `/provider/dashboard` with status badges, filters, and action buttons.
- [x] Provider can check earnings, escrow balance, MoMo payout details, and transaction history on `/provider/dashboard`.
- [x] `npx tsc --noEmit`, `npm run lint`, and `npm run build` pass with zero errors.

---

## 8. Manual Verification Steps
1. Navigate to `/` as a logged-in user with an email: verify greeting says `Welcome to Fix it, [Email-derived Name]`.
2. Click "Become a Provider" in the header: verify immediate navigation to `/provider/onboarding`.
3. In `/provider/dashboard`, click "View profile": verify `/provider/profile` renders with provider bio, services, portfolio, and credentials.
4. On `/provider/dashboard`, click the "Orders Received" tab or select `Bookings ⌵ -> Orders Received` in the header: verify orders list displays with status badges and filters.
5. Click "Confirm" or "Mark Completed" on an order: verify the status updates in real-time.
6. Click the "Earnings & Payouts" tab or select `Earnings ⌵ -> Earnings & Payouts` in the header: verify net earnings, pending escrow, MoMo configuration, and transaction breakdown.
