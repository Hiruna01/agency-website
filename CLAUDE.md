# Agency Website — Project Memory

## What This Project Is
A web development agency website ("Kōdex") with three parts:
1. A single-page landing page (current focus — mostly complete)
2. An appointment booking page (future phase, links to "/book")
3. An admin dashboard (future phase)

## Tech Stack
- Framework: Next.js 16.1.6 (App Router, Turbopack)
- Language: TypeScript
- Styling: Tailwind CSS v4 (CSS-based config in globals.css, NOT tailwind.config.ts)
- UI Components: shadcn/ui (Radix UI based)
- Icons: Lucide React
- Animations: Framer Motion 12.x (scroll-triggered reveals, typing rotator)
- Hosting: Vercel
- Package Manager: npm
- React: 19.2.3

## Tailwind CSS v4 Notes
- Configuration lives in `app/globals.css` under `@theme inline { }` block
- Brand colors defined as CSS custom properties: `--color-brand-primary`, `--color-brand-secondary`, etc.
- Usage in classes: `text-brand-primary`, `bg-brand-surface`, etc.
- No `tailwind.config.ts` file — Tailwind v4 uses CSS-based config
- Imports: `@import "tailwindcss"`, `@import "tw-animate-css"`, `@import "shadcn/tailwind.css"`

## Design System
- Primary Color: #1A3C6E (deep navy) — `brand-primary`
- Secondary Color: #2E75B6 (bright blue) — `brand-secondary`
- Accent Color: #3A8FD4 (light blue) — `brand-accent`
- Dark Text: #1A1A2E — `brand-dark`
- Body Text: #4A4A5E — `brand-body`
- Muted Text: #9CA3AF — `brand-muted`
- Background: #FFFFFF
- Surface: #F8FAFC — `brand-surface` (alternating sections)
- Heading Font: Inter (700/800 weight)
- Body Font: Inter (400 weight)
- Border Radius: 8px cards, 12px containers, 999px buttons
- Container Max Width: 1280px

## Coding Conventions
- Use TypeScript strict mode, no "any" types
- Use named exports, not default exports (except page.tsx)
- Components go in /components with PascalCase filenames
- One component per file
- Use Tailwind utility classes, no custom CSS files
- Mobile-first: write base styles for mobile, add md: and lg: for larger screens
- All images use Next.js Image component with WebP format
- Use semantic HTML (section, nav, main, article, footer)
- Framer Motion ease types need `as const` to avoid TypeScript errors (e.g., `"easeOut" as const`)

## Commands
- npm run dev: Start dev server (port 3000)
- npm run build: Production build
- npm run lint: ESLint check

## Architecture
- /app: Next.js App Router pages
- /app/globals.css: Tailwind v4 config + shadcn theme variables
- /components: Reusable UI components
- /components/sections: Landing page section components
- /components/layout: Header, Footer
- /components/ui: shadcn/ui base components + ScrollStack (unused)
- /lib: Utility functions and constants
- /lib/constants.ts: Site content data (services, testimonials, FAQ, pricing)
- /lib/utils.ts: cn() helper (clsx + tailwind-merge)
- /public: Static assets (images, favicon)
- /public/videos/hero-bg.mp4: Hero background video (blue particle animation)
- /public/images/portfolio-{1-6}.webp: Portfolio screenshots

## Current Landing Page Sections (in order)
1. **Hero** — Full-screen video background, center-aligned, typing word rotator, stats bar at bottom, scroll indicator
2. **Services** — 3-column responsive grid with colored theme cards, Framer Motion scroll reveals
3. **Benefits** — 4 key benefits with stats
4. **Portfolio** — Project showcase cards
5. **Process** — 4-step process timeline
6. **Pricing** — 3 tiers (Starter Rs.5,000 / Professional Rs.10,000 / Enterprise Rs.25,000+)
7. **FAQ** — Accordion FAQ section
8. **FinalCTA** — Final call-to-action

Note: SocialProofBar exists as a file but is NOT used in page.tsx (removed to avoid duplication with Hero stats).

## Hero Section Details
- Video background with `useRef` + `useEffect` for load detection (handles cached videos via `readyState >= 3`)
- Explicit z-index layering: z-0 (fallback gradient) → z-[1] (video) → z-[2] (overlays) → z-[3] (grain) → z-[5] (content)
- TypingRotator cycles: "Revenue", "Conversions", "Growth", "Results" with blur transition
- AnimatedCounter with shortLabel (mobile) / label (desktop)
- Stats: 200+ Projects, 50+ Clients, 98% Satisfaction
- Client logos hidden on mobile (`hidden sm:flex`)
- Scroll indicator hidden on mobile (`hidden md:block`)
- Uses `100svh` for proper mobile viewport height

## Header
- Fixed position, transparent with white text over dark hero
- Switches to white background with dark text on scroll (scrollY > 50)
- Mobile hamburger menu with body scroll lock

## Files That Can Be Cleaned Up
- `components/ui/ScrollStack.tsx` — No longer imported anywhere (scroll stack was removed in favor of grid layout)
- `components/sections/SocialProofBar.tsx` — Not imported in page.tsx

## Important Rules
- NEVER use inline styles. Always use Tailwind classes.
- NEVER use default exports except for page.tsx files.
- Every section component must be responsive (mobile-first).
- All section content (text, pricing, FAQ answers) lives in /lib/constants.ts as typed data.
- Use Framer Motion only for scroll-triggered reveals, not complex animations.
- Keep all sections in separate files under /components/sections/.
- Alternate section backgrounds: white (#FFFFFF) and surface (#F8FAFC).
- The primary CTA "Book a Free Consultation" links to "/book".

## Known Issues & Lessons Learned
- Video `onLoadedData` React event may not fire for cached videos — use `useRef` + `useEffect` with `readyState >= 3` check + `canplay`/`loadeddata` event listeners instead
- Lenis smooth scroll library (`useWindowScroll` mode) hijacks entire page scroll and can break absolute-positioned elements like video backgrounds — avoid using it
- When doing scroll-based transform animations, NEVER call `getBoundingClientRect()` during scroll while also applying transforms — causes feedback loops/flickering. Cache positions on mount instead.
- Scroll-stacking card effects need `overflow: hidden` on wrapper + `maxTranslateY` clamp to prevent cards escaping their container
- Zod 4 uses `error: "message"` instead of `errorMap` for `z.enum()` custom error messages

## Booking System
- Route: /book (single form with consultation/project toggle)
- API: POST /api/bookings (validated, rate-limited, writes to DB, sends Telegram)
- Database: Supabase PostgreSQL via Prisma ORM
- Notifications: Telegram Bot API (free, no SDK, HTTP POST only)
- Validation: Zod schemas in /lib/validations/booking.ts (shared client + server)
- Form: React Hook Form + Zod resolver
- Rate limit: 5 requests per IP per hour (in-memory limiter)
- Components: /components/booking/ (BookingConfirmation, BookingToast)
- Prisma singleton: /lib/prisma.ts
- Telegram utility: /lib/telegram.ts (sendBookingNotification, generateReference)

## Environment Variables (in .env, NEVER committed)
- DATABASE_URL — Supabase PostgreSQL connection string
- DIRECT_URL — Supabase direct connection (for migrations)
- TELEGRAM_BOT_TOKEN — Telegram bot API token
- TELEGRAM_CHAT_ID — Your Telegram chat/group ID

## New Dependencies
- prisma, @prisma/client — ORM
- zod — validation
- react-hook-form, @hookform/resolvers — form handling
