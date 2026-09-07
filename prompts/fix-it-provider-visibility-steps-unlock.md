# Implementation Prompt: Provider Visibility Steps 3, 4, & 5 Implementation

## Goal
Implement interactive functionality and Sanity persistence for Provider Dashboard Steps 3, 4, and 5 ("Verify your identity", "Set service areas & working hours", and "Publish service & go live") which are currently hardcoded as locked and non-functional.

## Skills Read
- `sanity-best-practices`
- `node_modules/next/dist/docs/` (App Router Route Handlers and Client/Server state)

## Code Inspected
- `components/provider/visibility-steps-card.tsx`: Found Steps 3, 4, and 5 hardcoded with static `<span ...>Locked</span>` tags, no event handlers, and no dynamic completion indicators.
- `components/provider/dashboard-modals.tsx`: Missing modal implementations for Identity Verification, Service Areas & Working Hours, and Service Publishing confirmation.
- `app/provider/dashboard/page.tsx`: Lacks state handlers and modals for steps 3, 4, and 5.
- `app/api/provider/dashboard-data/route.ts`: Lacks querying of `verificationStatus`, `availability`, and publication status for calculating step completions.
- `studio/schemaTypes/documents/provider-profile.ts`: Contains `verificationStatus` ('unverified' | 'pending' | 'verified'), `serviceAreas`, `availability`, and `onboardingStatus`.
- `studio/schemaTypes/documents/service.ts`: Contains `status` ('draft' | 'published') and `serviceAreas`.

## Decisions and Assumptions
1. **Unlocking Sequence**:
   - Step 1 (Safety Guide) is optional.
   - Step 2 (Create Service) unlocks Steps 3, 4, and 5 once at least one service exists (`metrics.hasService === true`).
2. **Step 3 (Identity Verification)**:
   - Provides a modal to input Ghanaian identification (e.g. Ghana Card `GHA-XXXXXXXXX-X`) and optional document photo upload via the existing `/api/upload/image` route.
   - Securely commits `verificationStatus: 'verified'` (or `'pending'`) and `verified: true` to Sanity via `/api/provider/verify-identity`.
   - Never exposes private identity document details in public search results (adhering strictly to `AGENTS.md` section 7).
3. **Step 4 (Service Areas & Working Hours)**:
   - Provides a modal to configure service locations in Ghana (Accra Central, East Legon, Cantonments, Osu, Spintex, Tema, Kumasi, etc.) and operational hours (e.g., "Mon - Sat: 8:00 AM - 6:00 PM").
   - Persists `serviceAreas` and `availability` to Sanity via `/api/provider/service-areas-hours`.
4. **Step 5 (Publish Service & Go Live)**:
   - When clicked, verifies requirements and calls `/api/provider/publish`.
   - Promotes all provider's draft services to `status: 'published'` and sets `providerProfile.onboardingStatus: 'completed'`.
   - The UI reflects "Live & Published", and the services become discoverable on the marketplace.

## Files to Touch
1. `app/api/provider/verify-identity/route.ts` [NEW]: Route handler to save Ghana Card verification data to Sanity.
2. `app/api/provider/service-areas-hours/route.ts` [NEW]: Route handler to update provider's service areas and availability in Sanity.
3. `app/api/provider/publish/route.ts` [NEW]: Route handler to publish draft services and complete provider onboarding.
4. `app/api/provider/dashboard-data/route.ts` [MODIFY]: Include `verificationStatus`, `availability`, and service publication statuses in the returned JSON.
5. `components/provider/dashboard-modals.tsx` [MODIFY]: Add `VerifyIdentityModal`, `ServiceAreasHoursModal`, and `PublishServiceModal`.
6. `components/provider/visibility-steps-card.tsx` [MODIFY]: Wire unlocked states, click handlers (`onVerifyIdentity`, `onSetAreasAndHours`, `onPublish`), and dynamic status badges.
7. `app/provider/dashboard/page.tsx` [MODIFY]: Connect new modals, state tracking, and API calls to `VisibilityStepsCard`.

## Security Considerations
- Authentication is enforced via Clerk `auth()` in all route handlers; users can only modify their own `providerProfile` and `service` documents.
- Write operations use server-only tokens (`getServerClient({ useWriteToken: true })`); no tokens reach the browser client.
- Identity numbers and document uploads are stored in private provider profile attributes and excluded from public search projections.

## Acceptance Criteria
- Steps 3, 4, and 5 unlock dynamically once a service is created in Step 2.
- Provider can open Step 3, enter Ghana Card details, and submit; UI displays "Verified" or "In Review".
- Provider can open Step 4, pick Ghanaian localities and working hours, and submit; UI displays "Completed".
- Provider can click Step 5 "Publish & Go Live", which transitions service status to `published` in Sanity and updates UI to "Live & Published".
- All state persists to Sanity and reloads accurately on page refresh.

## Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## Manual Test Steps
1. Navigate to `http://localhost:3000/provider/dashboard`.
2. Ensure Step 2 has a service created (or create one using "Create a service").
3. Verify that Step 3, Step 4, and Step 5 unlock from their disabled state.
4. Click "Verify identity" in Step 3, enter a valid Ghana Card format, and submit. Confirm the badge turns green/verified.
5. Click "Set areas & hours" in Step 4, select neighborhoods (e.g., East Legon, Cantonments) and hours, then save. Confirm the badge turns green/completed.
6. Click "Publish & go live" in Step 5. Confirm the service status changes to published and Step 5 shows "Live & Published".
7. Refresh the page to confirm all step states remain persisted.
