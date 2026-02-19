import { Twitter, Linkedin, Github, Mail, Phone, MessageCircle } from "lucide-react";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";

const COMPANY_LINKS = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { icon: Twitter, href: SITE_CONFIG.social.twitter, label: "Twitter" },
  { icon: Linkedin, href: SITE_CONFIG.social.linkedin, label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="bg-brand-dark">
      <div className="mx-auto max-w-[1280px] px-4 pt-16 pb-8 md:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-xl font-extrabold tracking-tight text-white">
              {SITE_CONFIG.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              We design and develop high-performance websites that help
              businesses grow online. Fast delivery, modern tech, real results.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/50 transition-colors duration-200 hover:bg-brand-secondary/20 hover:text-brand-accent"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-sm text-white/70 transition-opacity duration-200 hover:opacity-100"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-opacity duration-200 hover:opacity-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-opacity duration-200 hover:opacity-100"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-accent" />
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-opacity duration-200 hover:opacity-100"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-accent" />
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-opacity duration-200 hover:opacity-100"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-brand-accent" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
          <div className="flex gap-5">
            <a
              href="/privacy"
              className="text-xs text-white/50 transition-opacity duration-200 hover:opacity-100"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-xs text-white/50 transition-opacity duration-200 hover:opacity-100"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
