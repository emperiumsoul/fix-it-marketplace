# Implementation Prompt: Fix it Sanity Content Model & Standalone Studio Workspace

## 1. Goal
Set up the complete Sanity content architecture and standalone Studio workspace for **Fix it** according to Section 5, 6, 8, 10, and 12 of `AGENTS.md` and `sanity-best-practices`. This establishes the schemas for services, packages, categories, provider profiles, customer profiles, bookings, job requests, conversations, messages, reviews, and search agent context, while structuring the project as two clean standalone workspaces in one repo (eliminating the legacy embedded Studio).

## 2. Skills Read & Applied
- `sanity-best-practices`:
  - Standalone Studio workspace structure (`references/project-structure.md`).
  - Schema definition syntax with `defineType`, `defineField`, `defineArrayMember` (`references/schema.md`).
  - Custom Desk Structure organizing content vs marketplace operations vs search config (`references/studio-structure.md`).
  - Image handling with hotspot and alt text (`references/image.md`).
  - Strict type generation setup (`references/typegen.md`).
- `content-modeling-best-practices`:
  - Separation of concerns between public service discovery and private user/booking state.
  - References vs embedded objects (e.g. packages embedded in service, portfolio embedded in provider, categories referenced).
- `AGENTS.md`:
  - Two standalone workspaces in one repository.
  - No embedded Studio inside Next.js (`app/studio` removed).
  - Explicit data modeling rules for Ghana local services (pricing in GHS, fixed relationships, real-world service work).
  - Grounded search config document (`agentContext`) with scope filters excluding private state.

## 3. Code & Config Inspected
- `.env.local` & `.env.example`: `NEXT_PUBLIC_SANITY_PROJECT_ID="csp17c7x"`, `NEXT_PUBLIC_SANITY_DATASET="production"`.
- Root `package.json`: Next.js 16.3.4, React 19.2.8.
- Untracked legacy embedded files in root: `app/studio/[[...tool]]/page.tsx`, `sanity.config.ts`, `sanity.cli.ts`, and empty `sanity/schemaTypes/index.ts`.
- Installed Sanity CLI version: `sanity 3.80.0`.

## 4. Decisions & Assumptions
1. **Two Standalone Workspaces**:
   - Establish `studio/` as a dedicated standalone Sanity Studio v3 workspace with its own `package.json`, `sanity.config.ts`, `sanity.cli.ts`, and schema architecture.
   - Root web application acts as the Next.js workspace. Remove the embedded route `app/studio/[[...tool]]/page.tsx` and move root studio config to `studio/`.
   - Install `@sanity/client`, `next-sanity`, `@sanity/image-url`, and `@portabletext/react` in root for web integration.
   - Configure convenient root scripts: `"studio:dev": "npm run dev --prefix studio"`, `"studio:build": "npm run build --prefix studio"`.
2. **Schema Taxonomy & Separation**:
   - **Public Discoverable Content**:
     - `service`: Top-level listing with title, slug, summary, cover image, gallery, starting price (in GHS), currency ('GHS'), references to `providerProfile` and `category`, publication status ('draft' | 'published'), service areas (Accra, Kumasi, Tema, Takoradi, etc.), rich text Portable Text description, included tasks, exclusions, FAQs, and embedded `servicePackage` array.
     - `category`: Title, slug, description, image, icon name, and subcategories.
     - `providerProfile`: Public display name, slug, photo, expertise, Portable Text bio, languages, service areas, availability, embedded `portfolioItem` array, work experience, education, certifications, and onboarding state.
   - **Private & Marketplace Operations**:
     - `customerProfile`: Owning `clerkUserId`, contact info, private addresses (excluded from search context).
     - `jobRequest`: Customer reference, category reference, scope, description, location, preferred date, status.
     - `booking`: Links customer, provider, and service with immutable agreed package/scope, price in GHS, scheduled time, private service address, job status (`requested`, `confirmed`, `in_progress`, `completed`, `cancelled`), and payment status/reference.
     - `conversation` & `message`: Customer and provider direct messaging state.
     - `review`: Verified completed booking review (rating 1-5, review text, customer, provider, service reference).
   - **Search Configuration**:
     - `agentContext`: Configuration document defining the search agent's content scope (filtering strictly to published services, categories, and approved public provider fields) and grounding instructions.
3. **Desk Structure**:
   - Custom desk structure in `studio/structure.ts` with distinct groupings:
     - 📁 **Public Marketplace**: Services, Categories, Providers.
     - 📋 **Bookings & Requests**: Job Requests, Bookings, Reviews.
     - 💬 **Messaging**: Conversations, Messages.
     - ⚙️ **Search Configuration**: Agent Context singleton/list.

## 5. Files to Touch
### New Studio Workspace (`studio/`)
- `studio/package.json`: [NEW] Studio workspace dependencies (`sanity@^3.80.0`, `@sanity/icons`, `@sanity/vision`, `react`, `react-dom`, `styled-components`).
- `studio/sanity.config.ts`: [NEW] Studio configuration with Desk Structure, Vision plugin, and project/dataset wiring.
- `studio/sanity.cli.ts`: [NEW] Sanity CLI config with TypeGen paths.
- `studio/tsconfig.json`: [NEW] TypeScript configuration for Studio.
- `studio/structure.ts`: [NEW] Grouped Studio Desk Structure.
- `studio/schemaTypes/index.ts`: [NEW] Schema index registering all types.
- `studio/schemaTypes/documents/service.ts`: [NEW] Service listing schema.
- `studio/schemaTypes/documents/category.ts`: [NEW] Category schema.
- `studio/schemaTypes/documents/provider-profile.ts`: [NEW] Provider profile schema.
- `studio/schemaTypes/documents/customer-profile.ts`: [NEW] Customer profile schema.
- `studio/schemaTypes/documents/job-request.ts`: [NEW] Job request schema.
- `studio/schemaTypes/documents/booking.ts`: [NEW] Booking record schema.
- `studio/schemaTypes/documents/conversation.ts`: [NEW] Conversation schema.
- `studio/schemaTypes/documents/message.ts`: [NEW] Message schema.
- `studio/schemaTypes/documents/review.ts`: [NEW] Verified booking review schema.
- `studio/schemaTypes/documents/agent-context.ts`: [NEW] Search config document schema.
- `studio/schemaTypes/objects/service-package.ts`: [NEW] Embedded service package schema.
- `studio/schemaTypes/objects/portfolio-item.ts`: [NEW] Embedded portfolio item schema.
- `studio/schemaTypes/objects/block-content.ts`: [NEW] Portable Text rich text schema.
- `studio/schemaTypes/objects/faq.ts`: [NEW] FAQ item schema.
- `studio/schemaTypes/objects/work-experience.ts`: [NEW] Work experience item schema.
- `studio/schemaTypes/objects/education.ts`: [NEW] Education item schema.
- `studio/schemaTypes/objects/certification.ts`: [NEW] Certification item schema.

### Web Workspace (`tasklink/`)
- `app/studio/[[...tool]]/page.tsx`: [DELETE] Remove embedded studio route.
- `sanity.config.ts`: [DELETE] Remove root-level studio config.
- `sanity.cli.ts`: [DELETE] Remove root-level studio CLI.
- `sanity/lib/client.ts`: [MODIFY] Configure read-only server client with dataset/projectId and server-side token helper.
- `sanity/lib/image.ts`: [MODIFY] Image URL helper using `@sanity/image-url`.
- `sanity/lib/server-client.ts`: [NEW] Server-only authenticated Sanity client for mutations.
- `package.json`: [MODIFY] Add root scripts (`studio:dev`, `studio:build`) and install `next-sanity`, `@sanity/image-url`, `@portabletext/react`.
- `.env.example`: [MODIFY] Document `SANITY_API_READ_TOKEN` and `SANITY_API_WRITE_TOKEN`.

## 6. Requirements & Schema Specifications
1. **Service Listing (`service`)**:
   - Fields: `title`, `slug`, `category` (ref `category`), `provider` (ref `providerProfile`), `summary`, `coverImage`, `gallery`, `startingPrice` (min 0), `currency` (options: `['GHS']`), `status` (list: `'draft'`, `'published'`), `serviceAreas` (list of Ghana regions/cities), `description` (Portable Text `blockContent`), `includedTasks` (string array), `exclusions` (string array), `faqs` (array of `faq`), `packages` (array of `servicePackage`).
2. **Provider Profile (`providerProfile`)**:
   - Fields: `displayName`, `slug`, `clerkUserId` (readOnly), `photo`, `expertise` (string array), `bio` (Portable Text `blockContent`), `languages` (string array), `serviceAreas` (string array), `availability` (string/status), `portfolio` (array of `portfolioItem`), `workExperience`, `education`, `certifications`, `onboardingStatus` (`pending` | `completed`), `verificationStatus` (`unverified` | `pending` | `verified`).
3. **Category (`category`)**:
   - Fields: `title`, `slug`, `description`, `image`, `iconName`, `subcategories`.
4. **Booking (`booking`)**:
   - Fields: `customer` (ref `customerProfile`), `provider` (ref `providerProfile`), `service` (ref `service`), `agreedPackageName`, `agreedScope`, `agreedPrice`, `currency`, `scheduledTime`, `serviceAddress` (private text), `jobStatus` (`requested` | `confirmed` | `in_progress` | `completed` | `cancelled`), `paymentStatus` (`unpaid` | `pending` | `paid` | `refunded`), `paymentReference`.
5. **Agent Context (`agentContext`)**:
   - Fields: `title`, `description`, `contentScopeFilter` (text/code), `searchInstructions` (text).

## 7. Security & Boundaries
- Customer addresses, Clerk IDs, private verification documents, and payment details are isolated on private schema types or marked private.
- The browser never holds Sanity write tokens or direct mutation access.
- Embedded Studio removed from Next.js request boundary.
- Server-only client with write token restricted to Next.js API/server action routes.

## 8. Acceptance Criteria
1. `studio` workspace builds cleanly (`npm run build --prefix studio` succeeds with 0 errors).
2. All 11 schema documents and 7 embedded object schemas compile and match `AGENTS.md` specs.
3. Web workspace builds cleanly (`npm run build` succeeds with 0 errors).
4. No embedded `/studio` route in Next.js bundle.
5. All TypeScript checks pass across both workspaces.

## 9. Checks to Run
- `npm install` in `studio/` and root.
- `npm run build --prefix studio`
- `npx tsc --noEmit` in root
- `npm run lint` in root
- `npm run build` in root

## 10. Exact Manual Test Steps
1. Run `npm run studio:dev` to launch Sanity Studio at `http://localhost:3333`.
2. Open `http://localhost:3333` and verify the Desk structure with grouped navigation:
   - Public Marketplace (Services, Categories, Providers)
   - Operations (Job Requests, Bookings, Reviews)
   - Messaging (Conversations, Messages)
   - Agent Context (Search Config)
3. Open `http://localhost:3000` to verify web app functions normally and `/studio` route returns 404.
4. Verify creating a draft Category and Service in Studio succeeds.
