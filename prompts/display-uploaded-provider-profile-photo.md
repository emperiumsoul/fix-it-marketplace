# Implementation Prompt: Display Uploaded Provider Profile Photo

## 1. Goal
Display the provider's uploaded profile photo across the marketplace — including on category service cards (as both the provider avatar badge and fallback service thumbnail), service detail pages, and search cards — so that providers and customers can clearly see real provider photos.

---

## 2. Skills Read
- `AGENTS.md` (sections 1, 2, 3, 4, 7, 8, 11, 13)
- `sanity-best-practices`
- `content-modeling-best-practices`

---

## 3. Code Inspected
- `components/cards/service-card.tsx`:
  - Lacked a `providerPhotoUrl` prop and only showed plain text "By [Provider Name]" without the provider's avatar.
- `components/category/category-services-list.tsx`:
  - Did not forward `service.provider?.photoUrl` to `ServiceCard`, and fell back to a generic Unsplash stock photo instead of the provider's uploaded photo when `coverImageUrl` was not provided.
- `components/service-detail/service-detail-view.tsx`:
  - Showed a generic green trade icon under the service title instead of the provider's actual profile photo (`data.provider?.photoUrl`).
- `app/services/[slug]/page.tsx`:
  - When `raw.coverImageUrl` is not set, did not fall back to `raw.provider?.photoUrl` for the primary gallery image.
- `app/api/provider/profile/route.ts`:
  - When auto-creating a service, did not link `photoAssetId` as the service's `coverImage`.
- Sanity Data:
  - Cherith Tv has a real uploaded profile photo (`https://cdn.sanity.io/images/csp17c7x/production/02d514e1643d6d2d998fdd5fc2481850f50c165a-686x960.png`), but its service had no `coverImage` pointing to it.

---

## 4. Decisions and Assumptions
- **Provider Avatar on Service Cards**: Add a circular avatar (`w-5 h-5`) next to the provider's name on all service cards, displaying the uploaded profile photo when present (with an initial badge fallback).
- **Service Thumbnail Fallback**: If a service does not have an explicit `coverImageUrl`, use the provider's uploaded profile photo (`providerPhotoUrl`) before falling back to category stock photos.
- **Service Detail Subtitle Avatar**: Render the provider's uploaded avatar in `service-detail-view.tsx` next to their name.
- **Service Creation Image Linking**: In `app/api/provider/profile/route.ts`, when a provider uploads a photo during onboarding, set that image as the service's initial `coverImage`.
- **Sanity Patch for Cherith Tv**: Patch Cherith Tv's existing electrical service to link its `coverImage` to Cherith Tv's uploaded photo asset.

---

## 5. Files Expected to Touch
- `components/cards/service-card.tsx`
- `components/category/category-services-list.tsx`
- `components/service-detail/service-detail-view.tsx`
- `app/services/[slug]/page.tsx`
- `app/api/provider/profile/route.ts`
- `scripts/patch-cherith-service-image.mjs` (one-off script to patch Sanity)

---

## 6. Requirements
1. Service cards in category listings (`/categories/[slug]`) display:
   - The provider's uploaded profile photo avatar next to "By [Provider Name]".
   - The provider's uploaded photo as the card thumbnail if no dedicated cover image was set.
2. The service detail page (`/services/[slug]`) displays the provider's profile photo in the header subtitle row and in the Meet the Provider card.
3. Newly created services created via onboarding inherit the uploaded profile photo as their initial cover image.
4. Cherith Tv's live service reflects their uploaded profile image.

---

## 7. Security Considerations
- Image URLs use Sanity's secure CDN (`cdn.sanity.io`).
- All Sanity write operations run server-side using secure API tokens.

---

## 8. Acceptance Criteria
- `npx tsc --noEmit` passes with 0 errors.
- `npm run lint` passes with 0 errors.
- `npm run build` succeeds.
- Visiting `/categories/electrical-repairs` shows Cherith Tv's uploaded profile photo on the service card.
- Visiting Cherith Tv's service detail page shows their profile photo.

---

## 9. Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

---

## 10. Exact Manual Test Steps
1. Open [http://localhost:3000/categories/electrical-repairs](http://localhost:3000/categories/electrical-repairs).
2. Look at Cherith Tv's service card ("electrician by Cherith Tv"):
   - Verify the card thumbnail displays Cherith Tv's uploaded photo.
   - Verify the avatar next to "By Cherith Tv" shows the circular photo.
3. Click the card to open `/services/electrician-by-cherith-tv-...`:
   - Verify the provider avatar in the header and in the "Meet Cherith Tv" card displays the uploaded photo.
