# Agency Website — Project Memory

## What This Project Is
A web development agency website with three parts:
1. A single-page landing page (current focus)
2. An appointment booking page (future phase)
3. An admin dashboard (future phase)

## Tech Stack
- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: shadcn/ui (Radix UI based)
- Icons: Lucide React
- Animations: Framer Motion (lightweight usage)
- Hosting: Vercel
- Package Manager: npm

## Design System
- Primary Color: #1A3C6E (deep navy)
- Secondary Color: #2E75B6 (bright blue)
- Accent Color: #3A8FD4 (light blue)
- Dark Text: #1A1A2E
- Body Text: #4A4A5E
- Muted Text: #9CA3AF
- Background: #FFFFFF
- Surface: #F8FAFC (alternating sections)
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

## Commands
- npm run dev: Start dev server (port 3000)
- npm run build: Production build
- npm run lint: ESLint check

## Architecture
- /app: Next.js App Router pages
- /components: Reusable UI components
- /components/sections: Landing page section components
- /components/ui: shadcn/ui base components
- /lib: Utility functions and constants
- /lib/constants.ts: Site content data (services, testimonials, FAQ, pricing)
- /public: Static assets (images, favicon)

## Important Rules
- NEVER use inline styles. Always use Tailwind classes.
- NEVER use default exports except for page.tsx files.
- Every section component must be responsive (mobile-first).
- All section content (text, pricing, FAQ answers) lives in /lib/constants.ts as typed data.
- Use Framer Motion only for scroll-triggered reveals, not complex animations.
- Keep all sections in separate files under /components/sections/.
- Alternate section backgrounds: white (#FFFFFF) and surface (#F8FAFC).
- The primary CTA "Book a Free Consultation" links to "/book" (future page).
