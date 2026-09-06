# Implementation Prompt: Fix it Operations, Messaging & Search Configuration Seed Pipeline

## 1. Goal
Populate Sanity with realistic demonstration data for **Bookings & Operations**, **Customer-Provider Messaging**, and **Search Configuration** in accordance with Section 8, 10, and 11 of `AGENTS.md`. This populates customer profiles, job requests, bookings across all 5 job statuses (`requested`, `confirmed`, `in_progress`, `completed`, `cancelled`) with GHS pricing, agreed scopes, and fictional Ghanaian addresses; creates authentic messaging threads linked to those bookings and requests; and initializes the grounded search config document (`agentContext`) that enforces strict privacy boundaries excluding customer PII, messages, payment details, and private booking records from search context.

## 2. Skills Read & Applied
- `sanity-migration`:
  - Deterministic document IDs (`sample-cust-<id>`, `sample-req-<id>`, `sample-book-<id>`, `sample-conv-<id>`, `sample-msg-<id>`, `fix-it-search-agent-context`).
  - Idempotent `createOrReplace` mutations via Sanity HTTP Lake.
  - Relational consistency: referencing existing seeded providers and services.
  - Test-only isolation: ensuring simulated payment and verification statuses remain explicitly labeled.
- `sanity-best-practices`:
  - Standardized reference resolving and schema constraints.
  - Datetime formatting in ISO-8601 UTC.
- `AGENTS.md`:
  - Section 8: Dedicated records for customer profiles, job requests, bookings with agreed snapshots, conversations, messages, and agent context.
  - Section 10: Sanity Context document defining content scope filter and query instructions. Excludes private customer, booking, message, payment, and verification data.
  - Section 11: Grounded search rules, ranking by specificity, GHS currency, token-based matching.

## 3. Code & Config Inspected
- `.env.local`: `NEXT_PUBLIC_SANITY_PROJECT_ID="csp17c7x"`, `NEXT_PUBLIC_SANITY_DATASET="production"`, `SANITY_API_WRITE_TOKEN`.
- `studio/schemaTypes/documents/customer-profile.ts`: `clerkUserId`, `fullName`, `email`, `phone`, `address`, `city`.
- `studio/schemaTypes/documents/job-request.ts`: `customer`, `customerClerkUserId`, `category`, `title`, `description`, `location`, `preferredDate`, `scope`, `status` (`open`, `matched`, `closed`, `cancelled`), `createdAt`.
- `studio/schemaTypes/documents/booking.ts`: `customer`, `customerClerkUserId`, `provider`, `providerClerkUserId`, `service`, `agreedPackageName`, `agreedScope`, `agreedPrice`, `currency` ('GHS'), `scheduledTime`, `serviceAddress`, `jobStatus` (`requested`, `confirmed`, `in_progress`, `completed`, `cancelled`), `paymentStatus` (`unpaid`, `pending`, `paid`, `refunded`), `paymentReference`, `createdAt`.
- `studio/schemaTypes/documents/conversation.ts`: `participants`, `customer`, `provider`, `booking`, `jobRequest`, `lastMessageText`, `lastMessageAt`.
- `studio/schemaTypes/documents/message.ts`: `conversation`, `senderClerkUserId`, `text`, `createdAt`.
- `studio/schemaTypes/documents/agent-context.ts`: `title`, `contentScopeFilter`, `searchInstructions`.

## 4. Decisions & Assumptions
1. **Sample Customer Profiles (3)**:
   - **Abena Osei** (`sample-cust-abena-osei`, Clerk ID: `demo_cust_abena_osei`): East Legon, Accra.
   - **Kwabena Owusu** (`sample-cust-kwabena-owusu`, Clerk ID: `demo_cust_kwabena_owusu`): Ahodwo, Kumasi.
   - **Naa Ayeley Quaye** (`sample-cust-naa-ayeley`, Clerk ID: `demo_cust_naa_ayeley`): Osu / Cantonments, Accra.
2. **Sample Job Requests (4)**:
   - *[Sample Demo] Burst Pipe Emergency in Kitchen*: Plumbing / East Legon (Status: `matched`).
   - *[Sample Demo] Post-Tenancy Deep Cleaning for 3-Bed House*: Cleaning / Cantonments (Status: `open`).
   - *[Sample Demo] Inverter Battery Diagnostic & Rewiring*: Electrical / Kumasi (Status: `closed`).
   - *[Sample Demo] Compound Landscape Clearing Before Rainy Season*: Gardening / Legon Hills (Status: `open`).
3. **Sample Bookings Covering All 5 Statuses**:
   - `requested`: *[Sample Demo] Routine Weekly Home Cleaning* with Akosua CleanCo. Customer: Abena Osei. Unpaid, pending provider confirmation.
   - `confirmed`: *[Sample Demo] Residential Plumbing & Emergency Leak Repair* with Kwame Mensah. Customer: Naa Ayeley. Scheduled date, test payment pending.
   - `in_progress`: *[Sample Demo] Electrical Fault Finding & Socket Rewiring* with Kofi Boateng. Customer: Kwabena Owusu. Technician on-site, test payment paid.
   - `completed`: *[Sample Demo] Full House Deep Cleaning & Sanitization* with Akosua CleanCo. Customer: Abena Osei. Service successfully delivered, test payment paid.
   - `cancelled`: *[Sample Demo] Apartment Moving & Transport* with SwiftHaul. Customer: Naa Ayeley. Cancelled due to changed tenancy date, test payment refunded.
   - Fictional Ghanaian service addresses used for all bookings (e.g. *Plot 12 Boundary Road, East Legon, Accra*).
4. **Customer-Provider Messaging**:
   - 4 realistic conversations linked to the bookings and requests with chronological back-and-forth messages:
     - Scope clarification ("Do I need to purchase the PPR pipe fittings beforehand?").
     - Scheduling adjustment ("Can the crew arrive at 9:00 AM instead of 8:00 AM?").
     - Supplies verification ("Do you bring your own heavy-duty vacuum machines and eco-friendly soaps?").
     - On-site job progress update ("I have arrived at the property and isolated the main breaker.").
5. **Search Configuration (`agentContext`)**:
   - Deterministic ID: `fix-it-search-agent-context`.
   - `contentScopeFilter`: Strictly limits search agent visibility to published `service`, `category`, and approved public `providerProfile` documents with sanitized projection. Excludes private customer data, bookings, messages, payment references, and addresses.
   - `searchInstructions`: Embeds grounding instructions (exact trade matching, Ghanaian locations, GHS currency, ranking guidelines, zero fabrication).
6. **Sample Labeling & Safety**:
   - All titles and descriptions explicitly prefixed with `[Sample Demo]`.
   - Simulated payment references marked `test_pay_...`.
   - No external APIs, SMS, emails, or payment gateways will be triggered.

## 5. Files to Touch
- `scripts/seed-operations-and-search.mjs`: [NEW] Ingestion script for operations, messaging, and search config.
- `package.json`: [MODIFY] Add `"seed:operations": "node scripts/seed-operations-and-search.mjs"` and `"seed:all": "npm run seed && npm run seed:operations"`.
- `prompts/fix-it-seed-operations-and-search.md`: [NEW] This implementation prompt.

## 6. Requirements
- Populate 3 customer profiles with Ghanaian contact info and Clerk test IDs.
- Populate 4 job requests with categories, locations, dates, and realistic scopes.
- Populate 5 bookings covering `requested`, `confirmed`, `in_progress`, `completed`, and `cancelled` statuses with GHS pricing, packages, agreed scopes, and service addresses.
- Populate 4 conversations with over 12 realistic messages covering scheduling, scope, supplies, and arrival status.
- Populate 1 `agentContext` document with a privacy-preserving GROQ scope filter and search instructions.
- Ensure all records link to valid seeded documents.
- Script must be idempotent and runnable via `npm run seed:operations`.

## 7. Security Considerations
- Read `SANITY_API_WRITE_TOKEN` from `.env.local` server-side only.
- Simulated payment references prefixed with `test_` to prevent confusion.
- Customer addresses and phone numbers are fictional Ghanaian placeholders.
- The `agentContext` filter explicitly strips customer profiles, bookings, messages, and payment records from the AI search context lake.

## 8. Acceptance Criteria
- Running `node scripts/seed-operations-and-search.mjs` exits with code 0.
- Querying Sanity confirms:
  - 3 customer profiles.
  - 4 job requests.
  - 5 bookings (all 5 statuses represented).
  - 4 conversations and corresponding messages.
  - 1 agent context document with GROQ filter and search instructions.
- Sanity Studio at `http://localhost:3333/` displays all documents under their respective groups in the custom desk structure.

## 9. Checks to Run
- Run `node scripts/seed-operations-and-search.mjs` and check for 0 errors.
- Run GROQ verification script confirming counts and status distribution.
- Run `npm run lint` and `npx tsc --noEmit` in web workspace.
- View Sanity Studio at `http://localhost:3333/` to verify UI rendering.

## 10. Manual Verification Steps
1. Open Sanity Studio at `http://localhost:3333/`.
2. Under **Bookings & Operations**:
   - Check **Customer Profiles**: 3 profiles visible.
   - Check **Job Requests**: 4 requests with statuses open, matched, closed.
   - Check **Bookings**: 5 bookings showing statuses `requested`, `confirmed`, `in_progress`, `completed`, `cancelled`.
3. Under **Customer-Provider Messaging**:
   - Check **Conversations**: 4 conversations linked to customers and providers.
   - Check **Messages**: Inspect message history discussing scope, timing, and supplies.
4. Under **Search Configuration**:
   - Check **Search Agent Context**: Verify content scope filter and query instructions.
