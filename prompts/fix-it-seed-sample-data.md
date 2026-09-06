# Implementation Prompt: Fix it Sample Data Seed Pipeline (Ghana Local Services)

## 1. Goal
Implement an idempotent offline content ingestion pipeline (`scripts/seed-sample-data.mjs`) to seed realistic, high-quality sample data into the Sanity dataset for **Fix it** in accordance with Section 8 & 9 of `AGENTS.md`. The catalog will include 8 core service categories, 6 Ghanaian local service provider profiles (across Accra, Tema, Kumasi, Takoradi, East Legon), and 12 detailed service listings with multi-tier packages, GHS pricing, Ghana service areas, availability, included/excluded tasks, FAQs, Portable Text descriptions, and uploaded Sanity image assets. All data will be explicitly marked as sample demo content, with zero fabricated reviews or false completed job counts.

## 2. Skills Read & Applied
- `sanity-migration`:
  - Deterministic, repeatable document IDs (`sample-category-<slug>`, `sample-provider-<slug>`, `sample-service-<slug>`).
  - Idempotent `createOrReplace` operations ensuring reruns safely converge.
  - Sourcing and uploading real image assets to Sanity's asset store via `@sanity/client` rather than leaving external URLs.
  - Topological write order: Image Assets -> Categories & Providers -> Services referencing them.
  - Strict exclusion of fabricated reviews, fake completed jobs, or fake payment records.
- `sanity-best-practices`:
  - Structured Portable Text formatting with proper block specifications.
  - Image schema adherence with hotspot settings and alt text.
  - Standardized reference resolving with GROQ.
- `AGENTS.md`:
  - Section 8 (Content Modeling): Dedicated service documents linked to provider and category, embedded service packages with scope/tasks, provider profiles with Ghanaian service areas, and prices in GHS.
  - Section 9 (Content Ingestion): Offline tooling using stable IDs, service-specific imagery, category-neutral onboarding illustrations, and clearly labeled demonstration data.
  - Section 7 (Decisions): Search is grounded in real stored data; never fabricate reviews, completed job counts, or verification approvals.

## 3. Code & Config Inspected
- `.env.local`:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID="csp17c7x"`
  - `NEXT_PUBLIC_SANITY_DATASET="production"`
  - `SANITY_API_WRITE_TOKEN`: Verified active with HTTP 200 write permissions.
- `studio/schemaTypes/`:
  - `documents/category.ts`: Requires `title`, `slug`, `description`, `image`, `iconName`, `subcategories`.
  - `documents/provider-profile.ts`: Requires `displayName`, `slug`, `clerkUserId`, `photo`, `headline`, `expertise`, `bio`, `languages`, `serviceAreas`, `availability`, `onboardingStatus`, `verificationStatus`, `backgroundCheckStatus`.
  - `documents/service.ts`: Requires `title`, `slug`, `category` (ref), `provider` (ref), `summary`, `coverImage`, `gallery`, `startingPrice`, `currency` ('GHS'), `status` ('published'), `serviceAreas`, `description` (Portable Text), `includedTasks`, `exclusions`, `faqs`, `packages` (embedded `servicePackage` array).
  - `objects/service-package.ts`: Requires `name`, `price`, `scope`, `includedTasks`, `exclusions`, `estimatedDuration`.

## 4. Decisions & Assumptions
1. **Idempotency & Stable Document IDs**:
   - Use deterministic IDs so running the script multiple times updates existing documents without duplicating records:
     - Categories: `sample-cat-plumbing`, `sample-cat-cleaning`, `sample-cat-electrical`, `sample-cat-painting`, `sample-cat-moving`, `sample-cat-furniture`, `sample-cat-gardening`, `sample-cat-repairs`.
     - Providers: `sample-prov-kwame-mensah`, `sample-prov-akosua-cleanco`, `sample-prov-kofi-boateng`, `sample-prov-emmanuel-addo`, `sample-prov-swifthaul`, `sample-prov-yaw-osei`.
     - Services: `sample-srv-residential-plumbing`, `sample-srv-water-pump-borehole`, `sample-srv-deep-home-cleaning`, `sample-srv-standard-cleaning`, `sample-srv-electrical-wiring`, `sample-srv-generator-inverter`, `sample-srv-interior-exterior-painting`, `sample-srv-pop-ceiling-painting`, `sample-srv-residential-moving`, `sample-srv-office-moving`, `sample-srv-flatpack-assembly`, `sample-srv-lawn-garden-care`.
2. **Real Sanity Image Assets**:
   - High-quality, royalty-free photography (tools, work trucks, cleaning equipment, paint rollers, electrical boards, landscaping tools) will be fetched and uploaded directly to Sanity as `sanity.imageAsset` documents, then referenced in cover images, galleries, category thumbnails, and provider avatars.
3. **8 Core Service Categories**:
   - Plumbing (`Wrench` icon)
   - House Cleaning (`Sparkles` icon)
   - Electrical Repairs (`Zap` icon)
   - Painting & Decorating (`Paintbrush` icon)
   - Moving & Relocation (`Truck` icon)
   - Furniture Assembly (`Armchair` icon)
   - Gardening & Landscaping (`Shovel` icon)
   - Appliance & Home Repairs (`Hammer` icon)
4. **6 Ghanaian Local Service Providers**:
   - **Kwame Mensah Plumbing Services**: Accra Central, Osu, Cantonments, Tema.
   - **Akosua CleanCo & Facility Care**: East Legon, Airport Residential, Dzorwulu, Cantonments.
   - **Kofi Boateng Electrical & Power Solutions**: Kumasi (Adum, Ahodwo, KNUST, Bantama).
   - **Emmanuel Addo Precision Painting**: Greater Accra (Spintex, Sakumono, Tema, Osu).
   - **SwiftHaul Relocations & Logistics**: Accra, Tema, Kasoa, Madina.
   - **Yaw Osei HomeCare & Garden Services**: East Legon, Legon Hills, Adenta, Tema.
   - Trust fields set to real ground truth: `verificationStatus: 'unverified'`, `backgroundCheckStatus: 'not_started'`, `onboardingStatus: 'completed'`.
5. **12 Detailed Service Listings**:
   - Pricing in Ghana Cedi (`GHS`), starting from realistic local market rates (GHS 150 to GHS 2,800).
   - Multi-tier packages (e.g., Basic Inspection, Standard Repair, Comprehensive Overhaul) with explicit scopes, included tasks, exclusions, and duration estimates.
   - Service publication status: `'published'`.
   - Distinctly labeled with `[Sample Demo]` in titles and summaries to inform testing users that content is illustrative.

## 5. Files to Touch
- `scripts/seed-sample-data.mjs`: [NEW] The seed and ingestion script using `@sanity/client`.
- `package.json`: [MODIFY] Add `"seed": "node scripts/seed-sample-data.mjs"` convenience script.

## 6. Requirements
- Populate 8 categories with titles, slugs, descriptions, Lucide icon names, subcategories, and uploaded image assets.
- Populate 6 providers with display names, slugs, headlines, bios (Portable Text), languages (English, Twi, Ga), Ghanaian service areas, availability strings, and uploaded profile photos.
- Populate 12 published service listings spanning all 8 categories with:
  - Starting prices and packages in GHS.
  - Cover images and gallery images uploaded to Sanity.
  - Granular included tasks and exclusions.
  - Rich text Portable Text descriptions.
  - FAQs.
  - Ghana service areas matching the provider's coverage.
- Script must be runnable via `npm run seed` and be completely idempotent.

## 7. Security Considerations
- Read `SANITY_API_WRITE_TOKEN` strictly from local environment / `.env.local` server-side; do not hardcode credentials.
- No real customer PII or payment data will be ingested.
- Adheres to `AGENTS.md` mandate against fabricating reviews, fake 5-star ratings, or completed job counts.

## 8. Acceptance Criteria
- Running `node scripts/seed-sample-data.mjs` executes cleanly and outputs a summary of uploaded assets and created documents.
- Querying Sanity returns 8 categories, 6 provider profiles, and 12 service listings.
- Sanity Studio at `http://localhost:3333/` displays the populated categories, providers, and services with active images, packages, and references.
- Re-running the script updates existing documents without throwing duplicate key errors or creating duplicate documents.

## 9. Checks to Run
- `node scripts/seed-sample-data.mjs`: Execute the ingestion script and check for 0 errors.
- GROQ Verification Script: Query document counts and verify references (`category->title`, `provider->displayName`, package counts).
- Type check in web: `npm run build` or `npx tsc --noEmit` to ensure no workspace regressions.

## 10. Manual Verification Steps
1. Open Sanity Studio at `http://localhost:3333/`.
2. Inspect the **Services** desk view: verify that 12 service listings appear across Plumbing, Cleaning, Electrical, Painting, Moving, Furniture Assembly, Gardening, and Home Repairs.
3. Open any service (e.g., *[Sample Demo] Residential Plumbing & Leak Repair*):
   - Confirm cover image and gallery images load.
   - Confirm packages (Basic, Standard, Premium) display with GHS pricing and duration.
   - Confirm provider and category references link correctly.
4. Open the **Categories** desk view: confirm all 8 categories have descriptions, icon names, and images.
5. Open the **Provider Profiles** desk view: confirm 6 providers have photos, Ghanaian locations, and trade expertise.
