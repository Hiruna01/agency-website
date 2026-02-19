// =============================================================================
// Type Definitions
// =============================================================================

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
  };
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    twitter: string;
  };
  cta: {
    label: string;
    href: string;
  };
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Benefit {
  title: string;
  headline: string;
  description: string;
  stat: string;
  iconName: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  duration: string;
  iconName: string;
}

export interface PricingTier {
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  isPopular: boolean;
  cta: string;
}

export interface Testimonial {
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
  imagePlaceholder: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface PortfolioItem {
  title: string;
  category: string;
  description: string;
  imagePlaceholder: string;
  tags: string[];
}

// =============================================================================
// Site Configuration
// =============================================================================

export const SITE_CONFIG: SiteConfig = {
  name: "[YOUR AGENCY NAME]",
  tagline: "We Build Websites That Drive Revenue",
  description:
    "We design and develop high-performance websites, e-commerce stores, and web applications. Fast delivery, affordable pricing, modern technology.",
  contact: {
    email: "[YOUR EMAIL]",
    phone: "[YOUR PHONE]",
    whatsapp: "[YOUR WHATSAPP]",
  },
  social: {
    instagram: "[YOUR INSTAGRAM URL]",
    facebook: "[YOUR FACEBOOK URL]",
    linkedin: "[YOUR LINKEDIN URL]",
    twitter: "[YOUR TWITTER URL]",
  },
  cta: {
    label: "Book a Free Consultation",
    href: "/book",
  },
};

// =============================================================================
// Navigation
// =============================================================================

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

// =============================================================================
// Services
// =============================================================================

export const SERVICES: Service[] = [
  {
    id: "web-design",
    title: "Web Design",
    description:
      "Pixel-perfect designs that capture your brand identity and keep visitors engaged. Every layout is crafted for clarity, trust, and conversion — so your site doesn't just look good, it works.",
    iconName: "Palette",
  },
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Clean, fast, and scalable code built with modern frameworks. We develop responsive websites that load in under 2 seconds and score 90+ on Google PageSpeed — giving you an edge in search rankings.",
    iconName: "Code",
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description:
      "Online stores designed to sell. From product pages to checkout flows, we build e-commerce experiences with secure payments, inventory management, and mobile-first shopping that converts browsers into buyers.",
    iconName: "ShoppingCart",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Research-driven interfaces that guide users toward action. We map user journeys, wireframe every interaction, and prototype before building — so you launch with confidence, not guesswork.",
    iconName: "Figma",
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance",
    description:
      "Keep your site secure, updated, and performing at its best. Our maintenance plans cover security patches, content updates, performance monitoring, and monthly health reports — so you can focus on your business.",
    iconName: "Wrench",
  },
  {
    id: "landing-pages",
    title: "Landing Pages",
    description:
      "High-converting landing pages engineered for ad campaigns, product launches, and lead generation. Every element — headline, CTA, layout — is optimized to maximize your return on ad spend.",
    iconName: "Rocket",
  },
];

// =============================================================================
// Benefits
// =============================================================================

export const BENEFITS: Benefit[] = [
  {
    title: "Speed",
    headline: "Ultra-Fast Delivery",
    description:
      "Most projects go live in 2–4 weeks, not months. Our streamlined workflow eliminates bottlenecks so you start generating leads and revenue faster than with any traditional agency.",
    stat: "2–4 Weeks",
    iconName: "Zap",
  },
  {
    title: "Value",
    headline: "Affordable Pricing",
    description:
      "Enterprise-quality websites at a fraction of the cost. No hidden fees, no hourly billing surprises. You get a fixed quote upfront and a website that punches well above its price tag.",
    stat: "60% Less",
    iconName: "BadgeDollarSign",
  },
  {
    title: "Precision",
    headline: "Fewer Revisions",
    description:
      "We nail it early. Detailed discovery calls and design mockups mean you see exactly what you're getting before a single line of code is written. Most clients approve within 1–2 revision rounds.",
    stat: "1–2 Rounds",
    iconName: "Target",
  },
  {
    title: "Modern Stack",
    headline: "Cutting-Edge Tech",
    description:
      "Built with Next.js, React, and Tailwind CSS — the same technology stack powering sites for Fortune 500 companies. Your site will be fast, SEO-friendly, and ready to scale as your business grows.",
    stat: "90+ PageSpeed",
    iconName: "Cpu",
  },
];

// =============================================================================
// Process Steps
// =============================================================================

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: "Free Consultation",
    description:
      "We start with a 30-minute call to understand your business goals, target audience, and vision. You'll walk away with a clear project scope and an honest recommendation — even if that means we're not the right fit.",
    duration: "30 min call",
    iconName: "MessageCircle",
  },
  {
    stepNumber: 2,
    title: "Strategy & Design",
    description:
      "We map out your site architecture, create wireframes, and design high-fidelity mockups in Figma. You'll review and approve every screen before we move to development — no surprises, no wasted time.",
    duration: "3–5 days",
    iconName: "PenTool",
  },
  {
    stepNumber: 3,
    title: "Development",
    description:
      "Your approved designs are translated into clean, performant code. We build with responsive layouts, SEO best practices, and fast load times baked in. You'll get a staging link to test everything on real devices.",
    duration: "1–3 weeks",
    iconName: "Code2",
  },
  {
    stepNumber: 4,
    title: "Launch & Support",
    description:
      "After final QA and your sign-off, we deploy to production, configure analytics, and submit your site to search engines. You also get 30 days of free post-launch support for bug fixes and minor tweaks.",
    duration: "1–2 days",
    iconName: "Rocket",
  },
];

// =============================================================================
// Pricing Tiers
// =============================================================================

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "Rs.5,000",
    subtitle: "Perfect for small businesses",
    features: [
      "Up to 5 custom-designed pages",
      "Mobile-responsive layout",
      "Contact form integration",
      "Basic SEO setup (meta tags, sitemap)",
      "Social media link integration",
      "Google Analytics setup",
      "1 round of design revisions",
    ],
    isPopular: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "Rs.10,000",
    subtitle: "Complete package for growing businesses",
    features: [
      "Up to 10 custom-designed pages",
      "Mobile-responsive layout",
      "Advanced contact forms with validation",
      "Full SEO optimization (on-page + technical)",
      "Blog or news section",
      "Google Analytics + Search Console setup",
      "WhatsApp chat widget",
      "Image gallery or portfolio section",
      "Speed optimization (90+ PageSpeed)",
      "2 rounds of design revisions",
    ],
    isPopular: true,
    cta: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Rs.25,000+",
    subtitle: "For ambitious projects that demand more",
    features: [
      "Unlimited pages",
      "Custom UI/UX design with Figma prototypes",
      "E-commerce functionality (up to 50 products)",
      "Payment gateway integration",
      "User authentication and dashboards",
      "Advanced SEO with content strategy",
      "CMS integration for easy content updates",
      "Third-party API integrations",
      "Performance monitoring dashboard",
      "Priority support (48-hour response)",
      "3 rounds of design revisions",
      "30 days free post-launch maintenance",
    ],
    isPopular: false,
    cta: "Contact Us",
  },
];

// =============================================================================
// Testimonials
// =============================================================================

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aisha Fernando",
    company: "Bloom Botanics",
    role: "Founder",
    quote:
      "They delivered our e-commerce store in just 3 weeks — and sales doubled in the first month. The site loads incredibly fast, the checkout is seamless, and our customers constantly compliment the design. Best investment we've made for the business.",
    rating: 5,
    imagePlaceholder: "/images/testimonial-1.webp",
  },
  {
    name: "Ravindu Perera",
    company: "Apex Fitness Studio",
    role: "Managing Director",
    quote:
      "We went from zero online presence to fully booked classes within weeks. The booking integration and mobile-friendly design made it effortless for our members to sign up. Their team genuinely understood what a fitness business needs.",
    rating: 5,
    imagePlaceholder: "/images/testimonial-2.webp",
  },
  {
    name: "Nimal Jayawardena",
    company: "Jayawardena & Associates",
    role: "Senior Partner",
    quote:
      "As a law firm, we needed a site that exuded trust and professionalism. They nailed it on the first design. The site brought in 12 new client inquiries in the first two weeks — more than our previous site generated in three months.",
    rating: 5,
    imagePlaceholder: "/images/testimonial-3.webp",
  },
  {
    name: "Dilini Samarasinghe",
    company: "Ceylon Spice Market",
    role: "Co-Founder",
    quote:
      "We needed an online store that could handle international shipping and multiple payment methods. They built exactly that — plus a backend dashboard that makes managing orders a breeze. Our overseas sales are up 40% since launch.",
    rating: 5,
    imagePlaceholder: "/images/testimonial-4.webp",
  },
  {
    name: "Kasun Wijesekara",
    company: "TechPulse Digital",
    role: "CEO",
    quote:
      "We'd been burned by two agencies before. These guys were different — transparent pricing, no scope creep, and they actually hit the deadline. The landing page they built for our SaaS product converts at 8.2%, way above our industry average.",
    rating: 5,
    imagePlaceholder: "/images/testimonial-5.webp",
  },
];

// =============================================================================
// FAQ
// =============================================================================

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How much does a website cost?",
    answer:
      "Our projects start at Rs.5,000 for a 5-page business website and go up based on complexity. Every project gets a fixed-price quote upfront — no hidden fees, no hourly billing. Book a free consultation and we'll give you an honest estimate within 24 hours.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Most websites are delivered in 2–4 weeks from kickoff. A simple landing page can be ready in under a week, while larger e-commerce or custom projects typically take 3–6 weeks. We'll give you an exact timeline during our consultation call.",
  },
  {
    question: "How many revisions do I get?",
    answer:
      "Each plan includes revision rounds — 1 for Starter, 2 for Professional, and 3 for Enterprise. Because we show you detailed mockups before development, most clients approve with minimal changes. Additional revisions beyond your plan are available at a fair hourly rate.",
  },
  {
    question: "Do you offer website maintenance after launch?",
    answer:
      "Yes. Every project includes 30 days of free post-launch support for bug fixes and minor tweaks. Beyond that, we offer monthly maintenance plans starting at Rs.1,000/month that cover security updates, content changes, backups, and performance monitoring.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We build with Next.js, React, TypeScript, and Tailwind CSS — the same modern stack used by companies like Netflix, Airbnb, and Vercel. For e-commerce, we integrate with Shopify or custom solutions. This ensures your site is fast, SEO-friendly, secure, and easy to scale.",
  },
  {
    question: "Will my website work on mobile devices?",
    answer:
      "Absolutely. Every website we build is mobile-first, meaning we design for phones first and scale up to tablets and desktops. With over 60% of web traffic coming from mobile devices, this approach ensures your site looks and performs flawlessly on every screen size.",
  },
  {
    question: "Do you provide hosting, or do I need my own?",
    answer:
      "We deploy to Vercel, which offers blazing-fast global hosting with a generous free tier that handles most business sites. If your project needs a custom server or specific hosting provider, we'll set that up too. Either way, we handle the entire deployment for you.",
  },
  {
    question: "What happens after my website goes live?",
    answer:
      "After launch, you get 30 days of free support. We also set up Google Analytics and Search Console so you can track traffic from day one. If you need ongoing help — content updates, new features, marketing pages — we're just a WhatsApp message away with flexible monthly plans.",
  },
];

// =============================================================================
// Stats
// =============================================================================

export const STATS: Stat[] = [
  { value: "200+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "4.9★", label: "Average Rating" },
  { value: "2-4 Wks", label: "Avg Delivery" },
];

// =============================================================================
// Portfolio
// =============================================================================

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    title: "Bloom Botanics Online Store",
    category: "E-Commerce",
    description:
      "A modern e-commerce platform for an organic skincare brand. Features product filtering, secure checkout with multiple payment gateways, and a loyalty rewards system that increased repeat purchases by 35%.",
    imagePlaceholder: "/images/portfolio-1.webp",
    tags: ["Next.js", "Stripe", "E-Commerce", "Tailwind CSS"],
  },
  {
    title: "Apex Fitness Booking Platform",
    category: "Web Application",
    description:
      "A class booking and membership management system for a fitness studio chain. Members book sessions in real-time, manage subscriptions, and track workout history through a personalized dashboard.",
    imagePlaceholder: "/images/portfolio-2.webp",
    tags: ["React", "Node.js", "PostgreSQL", "Real-Time"],
  },
  {
    title: "Jayawardena & Associates",
    category: "Web Design",
    description:
      "A professional corporate website for a leading law firm. Clean typography, trust-building layout, and an integrated case inquiry form that generated 12 new client leads in the first two weeks.",
    imagePlaceholder: "/images/portfolio-3.webp",
    tags: ["Next.js", "SEO", "Contact Forms", "Corporate"],
  },
  {
    title: "Ceylon Spice Market",
    category: "E-Commerce",
    description:
      "An international e-commerce store for a premium spice exporter. Multi-currency support, international shipping calculator, and a product subscription model that drives 40% of recurring revenue.",
    imagePlaceholder: "/images/portfolio-4.webp",
    tags: ["Shopify", "Multi-Currency", "International", "Subscriptions"],
  },
  {
    title: "TechPulse SaaS Landing Page",
    category: "Landing Page",
    description:
      "A high-converting landing page for a B2B SaaS product. A/B tested headlines, animated feature showcases, and a streamlined signup flow that achieved an 8.2% visitor-to-trial conversion rate.",
    imagePlaceholder: "/images/portfolio-5.webp",
    tags: ["Next.js", "Framer Motion", "A/B Testing", "SaaS"],
  },
  {
    title: "Island Escapes Travel Portal",
    category: "Web Application",
    description:
      "A travel booking platform with interactive destination maps, itinerary builder, and real-time availability for hotels and tours. Designed to showcase Sri Lanka's tourism with immersive visuals and smooth UX.",
    imagePlaceholder: "/images/portfolio-6.webp",
    tags: ["React", "Maps API", "Booking System", "Travel"],
  },
];
