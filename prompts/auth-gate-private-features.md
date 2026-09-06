# Implementation Prompt: Auth-Gate Private Marketplace Features (Favorites, Messages, Notifications, Bookings)

## 1. Goal
Ensure that private marketplace features (Notifications, Messages, Favorites/Saved services, and Bookings) are strictly gated by Clerk authentication:
1. **Header Navigation (`PublicHeader`)**: The utility icons (Bell notifications popover, Mail icon, Heart saved icon, and Bookings link) must **NOT** appear when signed out. They must only appear when the user is signed in.
2. **Mobile Menu**: "My Bookings & Orders", "Messages & Chat", and "Saved Services" must only be visible when signed in.
3. **Favorites / Service Cards (`ServiceCard`)**: Clicking the Heart icon on any service card when signed out must trigger the Clerk Sign-In modal instead of saving in an unauthenticated session.
4. **Dedicated Pages (`/bookings`, `/messages`, `/saved`)**: When visited by a signed-out user, each page displays an authenticated gate prompting the user to Sign In or Join with Clerk.
5. **Detail Modals (`ServiceBookingModal`, `ServiceContactModal`)**: When unauthenticated, prompt the user to sign in before requesting appointments or dispatching messages.

---

## 2. Skills & Standards Referenced
- `AGENTS.md`: "Public browsing pages (categories, service listings, service details, provider profiles) are read only. Private customer and provider pages read only the state the authenticated user is allowed to see... Auth is Clerk, wired through Next.js middleware. It gates whatever a feature marks as private."
- Clerk Next.js SDK: Utilizing `<Show when="signed-in">`, `<Show when="signed-out">`, and `useUser()` / `useClerk()`.

---

## 3. Code Inspected
- `components/navigation/public-header.tsx`: Lines 171-197 render the Bell, Mail, Heart, and Bookings elements outside `<Show when="signed-in">`. They are visible unconditionally to signed-out users alongside "Sign in" and "Join".
- `components/navigation/public-header.tsx`: Lines 271-291 in the mobile menu list Bookings, Messages, and Saved unconditionally.
- `components/cards/service-card.tsx`: Handles `handleToggleSave` without checking `isSignedIn`.
- `components/bookings/bookings-view.tsx`: Renders booking list unconditionally.
- `components/messages/messaging-view.tsx`: Renders messaging center unconditionally.
- `components/saved/saved-view.tsx`: Renders saved view unconditionally.

---

## 4. Key Decisions & Assumptions
1. **Header UI Alignment**:
   - When signed out: Desktop header renders `Fix it` logo, Search bar, `Become a Provider`, `EN` language selector, `Sign in` button, and `Join` button. Utility icons (Bell, Mail, Heart, Bookings) are hidden.
   - When signed in: Desktop header renders `Fix it` logo, Search bar, `Become a Provider`, Utility icons (Bell with unread badge, Mail, Heart, Bookings), `EN` language selector, and `UserButton`.
2. **Action Interception for Signed-Out Visitors**:
   - Clicking Heart on a `ServiceCard` when signed out opens Clerk's sign-in modal.
   - Visiting `/bookings`, `/messages`, or `/saved` when signed out displays a branded "Sign in required" card with `Sign in` and `Join` buttons.

---

## 5. Files to Touch
1. `components/navigation/public-header.tsx` [MODIFY]: Move utility icons inside `<Show when="signed-in">` for desktop and mobile.
2. `components/cards/service-card.tsx` [MODIFY]: Intercept heart click if signed out using Clerk's `useUser()` and `useClerk().openSignIn()`.
3. `components/bookings/bookings-view.tsx` [MODIFY]: Add signed-out gate rendering a clear authentication prompt.
4. `components/messages/messaging-view.tsx` [MODIFY]: Add signed-out gate rendering a clear authentication prompt.
5. `components/saved/saved-view.tsx` [MODIFY]: Add signed-out gate rendering a clear authentication prompt.

---

## 6. Acceptance Criteria
- [x] In the signed-out state, the top header only shows "Become a Provider", language selector "EN", "Sign in", and "Join" (no Bell, no Mail, no Heart, no Bookings).
- [x] In the signed-in state, Bell, Mail, Heart, Bookings, and UserButton appear.
- [x] Clicking the Heart on any service card when logged out opens the Clerk Sign-in modal.
- [x] Visiting `/bookings`, `/messages`, or `/saved` while logged out displays an authentication required card prompting to sign in.
- [x] `tsc --noEmit`, `npm run lint`, and `npm run build` pass with 0 errors.

---

## 7. Manual Test Steps
1. In an incognito tab or while signed out, open `http://localhost:3000`.
2. Verify the top header does not contain Bell, Mail, Heart, or Bookings.
3. Click the Heart icon on any service card: verify the Clerk Sign-in modal opens.
4. Navigate directly to `http://localhost:3000/bookings`, `http://localhost:3000/messages`, and `http://localhost:3000/saved`: verify each shows the sign-in prompt.
5. Sign in: verify Bell, Mail, Heart, Bookings, and UserButton appear in the header.
