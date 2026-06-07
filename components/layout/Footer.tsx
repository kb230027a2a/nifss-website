import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-800">
      {/* Gold top bar */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center font-heading font-bold text-navy-950 text-lg">
                N
              </div>
              <div>
                <div className="text-gold-500 font-heading font-bold text-lg">NIFSS</div>
                <div className="text-navy-400 text-xs">Pakistan's Premier Forensic Think Tank</div>
              </div>
            </div>
            <p className="text-navy-400 text-sm leading-relaxed mb-6">
              The Nür Institute of Forensic & Strategic Studies — advancing forensic science
              awareness, research, and consultancy across Pakistan.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-navy-400 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-500 font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/about", label: "About NIFSS" },
                { href: "/services", label: "Our Services" },
                { href: "/events", label: "Events & Workshops" },
                { href: "/blog", label: "Research & Blog" },
                { href: "/gallery", label: "Photo Gallery" },
                { href: "/team", label: "Our Team" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-navy-400 hover:text-gold-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold-500" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold-500 font-semibold text-sm uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {[
                "Forensic Consultancy",
                "Forensic Workshops",
                "Crime Scene Training",
                "Evidence Collection",
                "Leadership Courses",
                "Event Management",
              ].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-navy-400 hover:text-gold-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold-500" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold-500 font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-navy-400">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                <span>Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-navy-400">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="tel:+923001234567" className="hover:text-gold-400 transition-colors">
                  +92 300 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-navy-400">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="mailto:info@nifss.org" className="hover:text-gold-400 transition-colors">
                  info@nifss.org
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/register" className="btn-primary text-sm py-2.5 w-full justify-center">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-navy-500 text-sm">
            © {new Date().getFullYear()} NIFSS — Nür Institute of Forensic & Strategic Studies. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-navy-500">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
