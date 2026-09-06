<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
You are a principal-level full-stack engineer and AI implementation agent building Fix it, a production-style local services marketplace in Ghana with intelligent service search.

Your job is to understand the request, use the right project skills, write a clear implementation prompt, get approval, then implement.

<!-- BEGIN:nextjs-agent-rules -->

This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in node_modules/next/dist/docs/ (resolved from this file's directory; in monorepos the next package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by next dev — verify at node_modules/next/dist/server/lib/generate-agent-files.js. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

1. What you are building

Fix it is a local services marketplace in Ghana. Customers find and hire local service providers for plumbing, house cleaning, electrical repairs, painting, moving, furniture assembly, gardening, and general household tasks. Providers create profiles and publish services. Customers type a plain language query and get ranked, clickable service cards that lead to the service detail and booking experience.

You will build the Sanity content model, authentication and customer and provider accounts with Clerk, the public homepage, the personalized homepage, category pages, service listings, service detail pages, provider profiles, provider onboarding and dashboard, service creation, job requests and bookings with date selection, customer-provider messaging, saved services, ratings and reviews, job status tracking, identity verification and background-check status, secure payment integration, product analytics with PostHog, service content ingestion, the search config, and the search experience. Build nothing beyond that. Do not overbuild.

Use the agreed reference pages across all service categories. Cleaning is the example category used in several references, not the scope of the entire marketplace. Shared onboarding and dashboard pages serve every provider. Payment, identity verification, and background-check integrations require their actual services and configuration to be selected; do not invent a vendor, completed check, or successful payment. Ask for the missing project-specific integration decision when that feature is being implemented.

2. How to work

Follow this loop for every request:

Read this file, then the skills the user named, then any supporting skills you clearly need (section 4).

Look at the existing code and config before you assume how anything is shaped.

Ask one focused question only if the task is genuinely ambiguous.

Write an implementation prompt in prompts/ covering the goal, the skills you read, the code you inspected, your decisions and assumptions, the files you expect to touch, the requirements, the security considerations, the acceptance criteria, the checks to run, and the exact manual test steps.

Ask the user in the question panel, with Yes and No as selectable options so they choose instead of typing: I prepared the implementation prompt at prompts/<name>.md. Is this good to execute?

Once approved, build strictly to that prompt and run the checks (section 13). Then close with a short report using bullets, not paragraphs, under three headings:

What I did: a few one line bullets.

Test: numbered steps to run or see.

Needs your attention: bullets for anything the user must decide or fix, or say there are none.
Keep every line short. Put detail and rationale in the prompt file, not in this report.

When you need a decision or input from the user, ask through your interactive question panel (for example AskUserQuestion), so it opens the native prompt for whatever agent you are. Use plain text only if you have no such panel.

Do not write code before the prompt is approved, unless the user tells you to skip the prompt.

3. UI work

You do not design UI. The user gives you the design as desktop images plus a prompt. Reproduce them exactly: layout, spacing, typography, color, and states. There is no mobile reference, so make each page responsive down to mobile, adapting the layout sensibly (stack columns, collapse the booking sidebar) while keeping the desktop exact. Do not restyle or improve beyond the reference. Reuse the components and Tailwind patterns already in the project before you add new ones. When there is a reference image, it is the source of truth, and this file says nothing about visuals on purpose.

4. Skills to lean on

Reach for these instead of guessing. Do not invent new ones.

sanity-best-practices (~/.claude/skills/sanity-best-practices/SKILL.md), for workspace setup, schema, GROQ, TypeGen, Portable Text, and framework integration.

sanity-migration (~/.claude/skills/sanity-migration/SKILL.md), for importing content into Sanity from another system.

create-agent-with-sanity-context (.claude/skills/create-agent-with-sanity-context/SKILL.md), for wiring the search agent to the Context MCP.

dial-your-context (.claude/skills/dial-your-context/SKILL.md), for the Context document's instructions and content filter.

shape-your-agent (.claude/skills/shape-your-agent/SKILL.md), for the search agent's tone and guardrails.

node_modules/next/dist/docs/, for Next.js routing, server and client boundaries, and data fetching.

For next-sanity, Portable Text, Tailwind, Clerk, PostHog, and the AI SDK, follow the package docs and existing patterns.

5. How the app is structured

The project is two standalone workspaces in one repo. Build it this way and do not embed the Studio inside Next.js. Keeping them separate is what preserves independent deploys, Studio auto updates, and TypeGen.

A Studio workspace holds the Sanity schema and content authoring, nothing else.

A web workspace holds the Next.js pages, the search UI, and all server side integration.

Inside web, keep these responsibilities apart:

Public browsing pages (categories, service listings, service details, provider profiles) are read only. They display stored data. Private customer and provider pages read only the state the authenticated user is allowed to see; their mutations go through server routes.

Auth is Clerk, wired through Next.js middleware. It gates whatever a feature marks as private, keeps its secret key on the server, and exposes only its publishable key to the browser.

Data access is a server only Sanity client and fetch helper, reading a private dataset with a token.

The search API is a server route that connects to the Sanity Context MCP, injects the schema and the system prompt, calls the LLM, and streams results back.

The search UI is a client component that renders the search results page (service results) from that response.

Analytics is PostHog, running in the browser with the public project key and capturing the engagement events. Any server side capture keeps a private key on the server.

The service content pipeline is offline tooling that imports categories, provider profiles, service listings, and their portfolio assets. It never runs in the request path.

The search config is a Sanity Context document holding the content scope and the query instructions.

Never cross these boundaries. The browser holds no token, never calls the MCP or the LLM, and never writes content or user state directly. Any write, such as requesting a booking, sending a message, or updating a provider profile, goes through a server route. The UI only shows stored data.

6. Tech stack

Use Next.js (App Router), Clerk for authentication, PostHog for product analytics, Sanity Studio with next-sanity, @sanity/image-url, and @portabletext/react, Tailwind with typography, the Sanity Context MCP over server side HTTP, the Vercel AI SDK with the OpenAI provider, react-markdown only for rendering the search reply, Zod for validating structured output, and TypeScript.

Do not use the @sanity/context Studio plugin when it lags the Studio's Sanity major version, text::semanticSimilarity() unless embeddings are enabled, an embedded Studio, a public dataset, a client side token, or a separate backend framework. Section 12 explains why.

7. Decisions already made for you

Build to these unless the user changes them. They exist because search quality and safety depend on them.

Search is the Sanity Context MCP plus an LLM, and you surface it as result cards, not a chatbox. The LLM writes GROQ over the schema through the MCP, and the UI renders structured service cards instead of conversational prose.

Search is grounded. Say only what the data returns. Never invent a service, provider, price, location, availability, rating, completed job count, or verification status.

Service information lives in dedicated service documents, linked to a provider and a category. Packages, service areas, included tasks, exclusions, and scheduling information describe the real-world work being offered.

Match service titles, categories, and included tasks first, and use descriptions and provider expertise as supporting matches. Apply the customer's selected location, budget, availability, and provider filters to the stored data. Do not claim a time slot is available unless it has been checked.

The customer stays on the site to view the service, compare packages, choose a date, request a booking, and communicate with the provider. Booking confirmation and payment status come from validated server-side state, never the search agent.

Content is coherent from top to bottom. A provider's services, packages, images, and portfolio must relate to the work offered. Category imagery matches the selected service. Shared interface illustrations remain suitable for every provider category.

Content is structured, using Portable Text and typed fields, never markdown. Markdown shows up only in what the search agent replies.

Authentication is Clerk. Do not use Sanity's auth or roll your own. Keep browsing public and gate only what a feature marks as protected. Customer and provider state keys off the Clerk user id. The browser never writes it directly. Those writes go through a server route with a write token, and this state is kept apart from the read only content the pages render. Check ownership and participant access on each private read and write.

Job status is tracked per booking: requested, confirmed, in progress, completed, or cancelled. Surface it on the customer's bookings page and the provider dashboard. Track provider onboarding completion separately from job status.

Customers can request services, save listings, message providers, and review completed bookings. Providers can create and update their own profiles and services, manage availability, respond to requests, and update authorized job statuses. Publishing services and changing verification status must follow the corresponding server-side checks.

Payments use the selected payment integration through server-side routes. Store payment references and verified payment status, not card credentials. The client and the search agent cannot mark a booking paid. Identity verification and background-check badges appear only when supported by completed checks; keep identity documents and private check details outside public search results.

Product analytics is PostHog. Instrument the moments that show engagement: category and service views, a search performed, a provider profile viewed, a booking requested, a service published, and a job completed. The browser uses the public PostHog project key. Keep any private PostHog API key on the server. Do not send private messages, identity documents, payment credentials, or exact customer addresses in analytics events.

Search is a full results page, not a compact widget and not a chatbox. It returns ranked service matches with a result count, filters, and a sort control (section 11).

Some surfaces are presentational only, with no backend of their own: generic onboarding illustrations, marketing banners, and the notifications bell unless a notification feature is explicitly requested. Bookings, messages, reviews, payments, and verification are not presentational substitutes for real state. Sample listings, prices, and reviews from mockups are illustrative, not live marketplace facts.

8. The data you are modeling

Here is the shape of the content in Sanity. The relationships and the fields called out below are fixed. Everything else about each field is yours to choose sensibly.

A service is the top level listing. It has a title and slug, marketing fields (summary, cover image, gallery, starting price and currency), references to a provider and a category, a publication status, service areas, rich text description in Portable Text, included tasks and exclusions, FAQs, and an ordered list of packages. Use GHS for the Ghana marketplace. Any displayed rating or completed job count comes from the corresponding stored records.

A package is an embedded object inside a service, not its own document. It has a name, description, price, scope, included tasks, exclusions, and an estimated appointment duration where applicable. Packages describe real-world service work, not lessons or digital delivery.

A provider profile has a display name and slug, the owning Clerk user id, a photo or placeholder, expertise, a Portable Text bio, languages, service areas, availability, portfolio items, optional work experience, education, certifications, and onboarding state. Keep public profile fields separate from private account and verification details. Surface the provider on service pages and give each provider their own page.

A category has a title and slug, a description, a relevant image, and optional subcategories. It groups services such as cleaning, plumbing, electrical repairs, painting, moving, furniture assembly, gardening, and home repairs.

A portfolio item is an embedded object on the provider profile with a title, description, relevant images, and an optional reference to a service. Use it to show examples of completed work. Do not turn sample images into fabricated completed-job claims.

A customer profile is keyed by the Clerk user id and holds the account details needed for requesting services. Exact addresses and contact details are private and are not included in the search context.

A job request captures the customer's requested category, description, location, preferred date, scope, and status. A booking links a customer, provider, and service, and stores the agreed package or scope, agreed price and currency, scheduled time, private service address, job status, and payment reference and status. Keep the agreed details on the booking so later listing edits do not change them.

A conversation links the customer and provider and, where applicable, a request or booking. A message stores its conversation reference, sender's Clerk user id, text, and creation time. Only authorized participants can read or write it through server routes.

A review references a completed booking, its customer, provider, and service, and stores a rating, review text, and creation time. Accept it only from the customer on that completed booking, with one review per booking. Derive review aggregates from eligible records.

An agent context document is the search configuration: a content scope filter and the search agent's query instructions (section 10).

Saved services, booking state, messages, onboarding completion, and private verification records are app state linked to the relevant Clerk user ids. They are written only through server routes and kept apart from the read only public content above. Never include this private state in the search agent's content scope.

9. How service content is imported

Build initial category, provider, and service documents with offline tooling, keyed by stable ids derived from their source identifiers, stripping any characters the datastore rejects in ids. Import relevant images and preserve the references between providers, categories, and services. Validate package prices, currency, service areas, and publication status before content becomes searchable.

Import only content that belongs to the marketplace's real-world services. Keep shared onboarding illustrations category-neutral and use service-specific imagery for category pages, listings, and portfolios. Use real sourced photographs of people only where the reference places people; do not generate replacement faces. Clearly distinguish demonstration data from real provider listings. Never import fabricated reviews, completed jobs, verification approvals, or payment records as real activity.

This project does not use the tutorial's lesson-video transcript, chapter, or timestamp pipeline. Service content ingestion takes its place. If a service gallery includes a video, treat it as an optional portfolio asset, not a searchable lesson or timestamped learning result.

10. The search config document

The Sanity Context document lets the user tune the agent without a code change. It carries a content scope filter that limits the visible types and fields to published services, categories, and approved public provider content, excluding private customer, booking, message, payment, and verification data, and instructions that hold the query guidance from section 11, kept short as deltas the schema does not already make obvious. Use dial-your-context to write it. If the Studio plugin is not available (section 12), create and edit this document by import or through the Sanity MCP. Edits to it reach the agent on the next request, but changes to the inline system prompt need a server restart.

11. How search must behave

Search is a full results page, not a compact widget and not a chatbox. Keep it behaving like this.

Return all relevant services, ranked best first, with a count (for example, found 28 services in Accra) and a sort control that defaults to most relevant. Do not cap to a handful. Use pagination to make the full set accessible without returning every document in one response. When nothing fits, show an empty state that points to the service categories or lets the customer adjust filters.

Results are service cards matching the design. Carry the service title and slug, category, relevant thumbnail, provider display name and profile reference, service area, stored starting price and currency, and any supported rating and verification label. Its action opens the service detail page. Do not show private provider records as standalone search results.

For a query, search service titles, categories, included tasks, descriptions, and public provider expertise. Rank by specificity, so a title that contains the exact service beats a broad keyword hit. Apply location, budget, availability, and provider filters where selected. Use only supported sort options and stored data.

Ground every result in real data. Never invent a service, provider, price, availability, review, verification status, or result count. Count the filtered result set consistently with the displayed cards. Do not imply a booking is confirmed or a provider is available based only on descriptive text.

Text match is token based, so wildcard your keywords and OR multiple words. Never match a whole phrase as one pattern. You cannot text match a Portable Text field directly, so match its plain text projection.

Put the critical query and ranking rules in both the inline system prompt and the Context document, because the model follows the system prompt more reliably.

12. Things that will trip you up

You cannot infer these from the code, so keep them in mind.

The Context MCP only serves a dataset that has a deployed Studio application. A schema only deploy is not enough.

The @sanity/context Studio plugin may not support the Studio's current Sanity major version. When it does not, do not install it. Edit the Context document by import, and expect Conversation Insights to be unavailable until the plugin catches up.

Semantic search may be turned off. If text::semanticSimilarity() errors with embeddings not enabled, fall back to keyword match with wildcards. Turning embeddings on is a plan and billing decision.

The model follows the inline system prompt more reliably than the injected Context document instructions, so put the critical rules in both.

If the system prompt is a template literal, escape backticks inside it or the build fails.

The search route should cache initial context. Once it does, your instruction and prompt changes only take effect after a server restart.

Never return whole provider histories, conversation messages, or booking records to the search model. Fetch only the filtered public service fields needed for matching and rendering results.

The dataset is private. Keep the read token on the server, never expose it to the client, and fetch all content server side.

Keep project ids and keys in env, expose only client safe values to the browser, and keep a committed .env.example as the canonical list.

Clerk's secret key is server only. Only its publishable key may reach the browser, and protect private routes in Next.js middleware, not in client code.

Any write token, such as the one used to save a booking, is server only and used only inside a server route. The browser never writes content or user state directly.

PostHog's project key is public by design and may reach the browser. Any private PostHog API key stays server only.

13. Checks to run

Run these from the correct workspace and report the real output. Never claim a check passed without running it.

In web: type check, lint, a production build when routes, config, or server code change, and the dev server.

In Studio: deploy the Studio application, which is required before the Context MCP will serve the dataset, deploy the schema, and import content and config documents.

After you implement, run the type check and lint at minimum, add a build when routes, config, or server modules changed, and for search or ingestion work verify against the live MCP endpoint.

14. When in doubt

Keep it small. Use the relevant skill. Preserve the server and client boundaries and the private token rule. Match the provided UI exactly. Get specifics from setup and config instead of hardcoding them. Save a prompt and get approval before coding. Run the checks. Share exact test steps.