# Implementation Prompt: Comprehensive Marketplace Features & Functionality

## 1. Goal
Make all marketplace functionalities and features across the Fix it Ghana platform fully functional, interactive, and connected:
1. **Customer Bookings & Job Tracking (`/bookings`)**: Interactive bookings page displaying customer requests, confirmed appointments, in-progress jobs, and completed bookings with status timelines and verified review submission.
2. **Customer-Provider Messaging (`/messages`)**: Live messaging center allowing customers and service providers to communicate, discuss job scopes, negotiate pricing, and coordinate appointments.
3. **Saved Services & Favorites (`/saved`)**: Persistent favoriting of services across all service cards and detail pages, with a dedicated saved services collection page.
4. **Interactive Header Utilities**:
   - Notifications Bell: Dropdown displaying booking updates, message alerts, and marketplace notices.
   - Mail icon: Links directly to `/messages`.
   - Heart icon: Links directly to `/saved`.
   - Bookings link: Links directly to `/bookings`.
   - Language selector ("EN"): Interactive selector for English, Twi, Ga, and Ewe.
5. **Interactive Booking Request Flow**:
   - Service booking modal saves bookings with Ghana address and date/time selection, immediately updating both Customer Bookings and Provider Orders Received.
   - Contact modal creates conversations and routes to messaging.
6. **Welcome Page Quick Actions**:
   - Card 1 ("Post a project brief"): Launches interactive project brief request modal.
   - Card 2 ("Download the Fix it app"): Launches mobile app download modal with Ghana SMS & WhatsApp alerts.
   - Card 3 ("Tailor Fix it to your needs"): Opens provider onboarding or role selection.

---

## 2. Skills & Standards Referenced
- `sanity-best-practices`: Modeling bookings, messages, reviews, and customer profiles with private addresses kept safe.
- `AGENTS.md`: Adhering to the marketplace scope: bookings with date selection, customer-provider messaging, saved services, ratings and reviews, job status tracking, and provider dashboard.

---

## 3. Code Inspected
- `components/navigation/public-header.tsx`: Header icons (Bell, Mail, Heart, Bookings `#bookings`, Language `EN`) were unlinked placeholders.
- `components/service-detail/service-booking-modal.tsx`: Simulated submission without persisting to bookings store.
- `components/service-detail/service-contact-modal.tsx`: Simulated sending without storing conversation.
- `components/cards/service-card.tsx`: Heart button toggled local state without persistent storage.
- `components/welcome/welcome-hero.tsx`: Cards 1 & 2 used static placeholder links.

---

## 4. Key Decisions & Assumptions
1. **Unified Client Storage with Sanity Hydration**:
   - Store bookings, messages, and saved services in responsive local storage synchronized with user session and seeded Sanity operational records.
   - When a booking is requested, it appears in both Customer `/bookings` and Provider `/provider/dashboard?tab=orders`.
2. **Customer Bookings View (`/bookings`)**:
   - Status tabs: `All`, `Requested`, `Confirmed`, `In Progress`, `Completed`, `Cancelled`.
   - Complete booking card with provider details, agreed price in GHS, address, and status badge.
   - "Leave a Review" modal for completed jobs.
3. **Messaging Center (`/messages`)**:
   - Split layout: conversation threads on the left, active chat window on the right.
   - Context bar with service thumbnail, price in GHS, and appointment date.
   - Real-time message sending and timestamping.
4. **Saved Services (`/saved`)**:
   - Dedicated grid of favorited service cards with quick book and unsave actions.
5. **Notifications Popover**:
   - Dropdown with unread badge counter, notification items, and mark-as-read action.

---

## 5. Files to Touch
1. `app/bookings/page.tsx` [NEW]: Customer bookings page.
2. `components/bookings/bookings-view.tsx` [NEW]: Bookings list with status tabs, cancel action, and review modal.
3. `app/messages/page.tsx` [NEW]: Customer-provider messaging page.
4. `components/messages/messaging-view.tsx` [NEW]: Split conversation list and active chat.
5. `app/saved/page.tsx` [NEW]: Saved services page.
6. `components/saved/saved-view.tsx` [NEW]: Grid of favorited services.
7. `components/navigation/public-header.tsx` [MODIFY]: Wire `/bookings`, `/messages`, `/saved`, Bell popover, and Language selector.
8. `components/navigation/header-notifications.tsx` [NEW]: Interactive notifications dropdown.
9. `components/service-detail/service-booking-modal.tsx` [MODIFY]: Save bookings and route to `/bookings`.
10. `components/service-detail/service-contact-modal.tsx` [MODIFY]: Save messages and route to `/messages`.
11. `components/welcome/project-brief-modal.tsx` [NEW]: Post project brief modal.
12. `components/welcome/app-download-modal.tsx` [NEW]: App download modal.
13. `components/welcome/welcome-hero.tsx` [MODIFY]: Wire Cards 1, 2, and 3 to interactive modals.
14. `components/cards/service-card.tsx` [MODIFY]: Synchronize heart button with persistent saved store.

---

## 6. Acceptance Criteria
- [x] Clicking "Bookings" opens `/bookings` with filterable customer orders, status timeline, and review modal.
- [x] Clicking the Mail icon opens `/messages` with active customer-provider chat threads.
- [x] Clicking the Heart icon opens `/saved` displaying favorited services.
- [x] Clicking the Bell icon opens notification popover with mark-as-read.
- [x] Requesting a booking from any service detail page saves the booking and updates both customer bookings and provider orders.
- [x] Card 1 on welcome page opens Project Brief modal and submits custom job requests.
- [x] Card 2 on welcome page opens App Download modal with QR code.
- [x] TypeScript check, ESLint, and Next.js production build pass with 0 errors.

---

## 7. Manual Verification Steps
1. Click "Bookings" in the header to view `/bookings`.
2. Click the Mail icon to view and test `/messages`.
3. Click the Heart icon to view `/saved`, favorite a service from the homepage, and see it in `/saved`.
4. Click the Bell icon in the header to view and clear notifications.
5. On any service detail page (`/services/standard-home-cleaning`), request a booking and verify it shows up in `/bookings` and `/provider/dashboard?tab=orders`.
6. On the welcome page, click "Post a project brief" and "Download the Fix it app" to test the modals.
