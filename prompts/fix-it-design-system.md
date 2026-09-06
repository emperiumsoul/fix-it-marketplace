# Implementation Prompt: Fix it Design System Foundation

## 1. Goal
Implement the comprehensive design system foundation for **Fix it** (local services marketplace in Ghana) based exactly on the desktop reference specification in `c:\Users\emman\Desktop\tasklink\.design\fix it design system.png`. This includes design tokens in Tailwind CSS v4, custom typography scale, layout and elevation utilities, and all reusable UI components matching sections 01 to 14 of the reference.

## 2. Skills Read & Applied
- `sanity-best-practices`: Content modeling and UI integration conventions.
- Next.js 16 App Router docs in `node_modules/next/dist/docs/01-app`: Component boundaries (`"use client"` vs Server Components), metadata, font optimization.
- `AGENTS.md`: Strict adherence to workflow, exact visual reproduction, 44px touch targets, mobile responsiveness, and zero assumptions.

## 3. Code & Config Inspected
- `package.json`: Next.js 16.3.4, React 19.2.8, Tailwind CSS v4 (`@tailwindcss/postcss: ^4`, `tailwindcss: ^4`), TypeScript 5.
- `app/globals.css`: Tailwind v4 `@import "tailwindcss"` setup with CSS custom properties.
- `app/layout.tsx`: Root layout with font definitions.
- `app/page.tsx`: Default Next.js starter page.
- `.design/fix it design system.png`: High-resolution design specification detailing 14 core sections:
  1. Colors (Primary Brand Green `#003912`, Marketing Accents, Neutrals, Semantic status)
  2. Typography (Grotesque headings + Satoshi body/UI)
  3. Type Scale (Display 48/56 700, H1 32/40 700, H2 24/32 700, H3 20/28 600, Body 16/24 400, UI 14/20 500, Caption 12/16 400)
  4. Spacing & Layout (4px base scale, 24px gutters, max-w-[1280px] desktop, max-w-[960px] onboarding, 4/2/1 col grid)
  5. Radius & Elevation (4px badges, 8px controls, 12px cards, 16px panels, full avatars; subtle shadows with borders first)
  6. Icons (24px grid, 1.5–2px stroke, 16px inline, trade-neutral)
  7. Buttons (Primary, Secondary, Text in Default, Hover, Focus, Disabled states; 44px height, 8px radius, 16px padding)
  8. Inputs (Search, Location, Date in Default, Focus, Error, Disabled states; 44–48px height, 8px radius)
  9. Badges & Status (Plumbing, Cleaning, New provider, Identity verified, Pending, Unavailable; 4px radius)
  10. Progress & Feedback (Profile completion progress bar, Info banner, Booking status pills: Requested, Confirmed, Completed)
  11. Cards & Booking (Service Card with GH₵ pricing and rating, Provider Task Card, Provider Profile Card, Booking Card with Regular/Deep tabs)
  12. Navigation (Public site navbar with "Fix it." brand dot, Provider dashboard navbar, Breadcrumbs, Pagination)
  13. Imagery Rules & 14. Principles (44px targets, clear hierarchy, text before extra icons, accessible contrast)

## 4. Decisions & Assumptions
1. **Design Tokens via Tailwind v4 `@theme`**:
   - Define exact hex codes in `app/globals.css` using Tailwind v4's native `@theme` block:
     - Primary: `--color-primary: #003912;`, `--color-primary-hover: #00280D;`, `--color-primary-tint: #F3FDF9;`
     - Accents: `--color-accent-cyan: #3DD6F2;`, `--color-accent-burgundy: #4D1727;`, `--color-accent-orange: #FF7646;`
     - Neutrals: `--color-neutral-headings: #222325;`, `--color-neutral-body: #404145;`, `--color-neutral-secondary: #62646A;`, `--color-neutral-muted: #74767E;`, `--color-neutral-border: #DADBDD;`, `--color-neutral-surface: #F7F7F7;`, `--color-neutral-white: #FFFFFF;`
     - Semantic: `--color-semantic-success: #166334;`, `--color-semantic-warning: #92400E;`, `--color-semantic-error: #B42318;`, `--color-semantic-info: #1D4EDB;`
   - Radii: `--radius-badge: 4px;`, `--radius-control: 8px;`, `--radius-card: 12px;`, `--radius-panel: 16px;`
   - Shadows: `--shadow-subtle: 0 2px 8px rgba(0, 0, 0, 0.06);`, `--shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.10);`
2. **Typography**:
   - Grotesque heading font: Configure `Plus_Jakarta_Sans` via `next/font/google` as `--font-grotesque` (clean, geometric grotesque).
   - Satoshi body font: Import Satoshi font (400, 500, 700) from Fontshare via CSS, falling back to system sans.
   - Dedicated type classes matching Section 03 (`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-ui`, `text-caption`).
3. **Icon Library**:
   - Install `lucide-react` for standard 24px grid, 1.5–2px stroke icons matching Section 06.
4. **Currency**:
   - Standardize on Ghanaian Cedi (`GH₵`) across all prices.
5. **Showcase Page**:
   - Replace the default Next.js starter page (`app/page.tsx`) with an interactive, beautifully structured Design System Showcase page allowing visual inspection and live testing of every token and component against the reference image.

## 5. Files to Touch
- `package.json`: Install `lucide-react`
- `app/globals.css`: Full design system theme tokens, typography utility classes, scrollbar and reset styling
- `app/layout.tsx`: Font variable injection and page metadata ("Fix it - Local Services in Ghana")
- `components/ui/button.tsx`: Reusable Button component (primary, secondary, text variants; full state support)
- `components/ui/input.tsx`: Reusable Input component with icon slots, error message display, focus and disabled states
- `components/ui/badge.tsx`: Category and status badges (4px radius, icon support)
- `components/ui/progress.tsx`: Profile completion progress bar
- `components/ui/callout.tsx`: Info banner / feedback message
- `components/cards/service-card.tsx`: Marketplace service listing card (image, price, rating, location, save toggle)
- `components/cards/provider-cards.tsx`: Provider task card and profile card
- `components/cards/booking-card.tsx`: Interactive booking card with package tabs (Regular/Deep), date/time pickers, and CTA
- `components/navigation/navbar.tsx`: Public customer header & provider dashboard navbar
- `components/navigation/breadcrumbs.tsx`: Hierarchical breadcrumbs component
- `components/navigation/pagination.tsx`: Accessible pagination controls
- `app/page.tsx`: Interactive Design System showcase page displaying all 14 sections from the reference image

## 6. Security Considerations
- All styling and components are purely front-end UI primitives; no tokens, credentials, or private state are stored in client components.
- Form inputs and buttons use appropriate HTML semantic elements and accessible ARIA attributes.

## 7. Acceptance Criteria
1. Exact visual fidelity with `.design/fix it design system.png`:
   - Colors match exact hex codes.
   - Spacing, padding (16px), heights (44px buttons/inputs), radii (4px, 8px, 12px, 16px) match specifications.
   - Typography sizes and weights match the type scale table exactly.
2. Fully responsive down to mobile viewports (stacking columns, responsive navigation).
3. `npm run build` succeeds without type errors or lint warnings.
4. Component states (hover, focus, disabled, error) are interactive and visually distinct.

## 8. Checks to Run
- `npm i lucide-react`
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## 9. Exact Manual Test Steps
1. Navigate to `http://localhost:3000` in the browser.
2. Verify Section 01: Colors palette renders brand green (`#003912`), hover (`#00280D`), tint (`#F3FDF9`), accents, neutrals, and semantic colors.
3. Verify Section 02 & 03: Typography type scale matches Display (48px), H1 (32px), H2 (24px), H3 (20px), Body (16px), UI (14px), Caption (12px).
4. Verify Section 07: Buttons render Primary, Secondary, and Text variants across Default, Hover, Focus, and Disabled states.
5. Verify Section 08: Inputs render Search, Location, and Date inputs across Default, Focus, Error (with red error text), and Disabled states.
6. Verify Section 09: Badges display Plumbing, Cleaning, New provider, Identity verified, Pending, and Unavailable styles.
7. Verify Section 10: Progress bar displays "Profile completion · 7/12 (58%)" and info callout banner displays.
8. Verify Section 11: Service Card renders "Home cleaning", "From GH₵150", "★ 4.8 (120)", "Accra", with working save heart toggle. Booking card allows switching between "Regular" and "Deep" packages.
9. Verify Section 12: Public header, Provider navbar, Breadcrumbs, and Pagination render accurately.
10. Test viewport responsiveness by resizing to 375px (mobile) and confirming all elements wrap and stack cleanly.
