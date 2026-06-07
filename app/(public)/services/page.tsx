import type { Metadata } from "next";
import Link from "next/link";
import { Search, Microscope, Camera, Package, BarChart3, Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Our Services" };

const services = [
  {
    icon: Search,
    title: "Forensic Consultancy",
    desc: "Comprehensive forensic consulting for law enforcement agencies, legal teams, courts, and private institutions. Our experts provide guidance on evidence analysis, chain of custody, and forensic best practices.",
    price: "From PKR 25,000",
    features: ["Crime scene assessment", "Evidence review", "Expert witness support", "Lab analysis guidance"],
  },
  {
    icon: Microscope,
    title: "Forensic Workshop",
    desc: "Intensive hands-on training workshops covering forensic science fundamentals. Designed for law enforcement, legal professionals, and students seeking practical forensic skills.",
    price: "From PKR 5,000",
    features: ["Fingerprint analysis", "DNA evidence basics", "Toxicology overview", "Digital forensics intro"],
  },
  {
    icon: Camera,
    title: "Crime Scene Recording Workshop",
    desc: "Professional training on crime scene photography, videography, and digital documentation. Learn industry-standard techniques used by forensic investigators worldwide.",
    price: "From PKR 7,500",
    features: ["Crime scene photography", "Digital documentation", "3D scene mapping", "Evidence marking"],
  },
  {
    icon: Package,
    title: "Evidence Collection & Packaging Workshop",
    desc: "Comprehensive training on proper evidence handling, collection, packaging, and chain of custody protocols that meet international forensic standards.",
    price: "From PKR 7,500",
    features: ["Biological evidence handling", "Chain of custody protocols", "Packaging standards", "Court-ready evidence prep"],
  },
  {
    icon: BarChart3,
    title: "Leadership Course",
    desc: "Strategic leadership training for senior forensic professionals and law enforcement officers. Build the management and strategic thinking skills needed for leadership roles.",
    price: "From PKR 15,000",
    features: ["Strategic planning", "Team management", "Decision making under pressure", "Forensic unit leadership"],
  },
  {
    icon: Calendar,
    title: "Event Management",
    desc: "Professional organising of forensic conferences, legal symposia, awareness seminars, and training events. End-to-end event management with a forensic focus.",
    price: "From PKR 50,000",
    features: ["Conference planning", "Speaker management", "Venue coordination", "Post-event reporting"],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.1)_0%,_transparent_60%)]" />
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-3 py-1 mb-4">
            <span className="text-gold-400 text-xs font-medium uppercase tracking-wider">What We Offer</span>
          </div>
          <h1 className="font-heading text-5xl font-bold text-white mb-6">
            Our <span className="text-gold-500">Services</span>
          </h1>
          <p className="text-navy-300 text-xl max-w-2xl mx-auto">
            Expert forensic training, consultancy, and services designed to elevate Pakistan's forensic science capability.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(({ icon: Icon, title, desc, price, features }) => (
              <div key={title} className="card-dark flex flex-col hover:border-gold-500/40 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-gold-500" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-navy-400 text-sm leading-relaxed mb-4 flex-1">{desc}</p>
                <ul className="space-y-2 mb-5">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-navy-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-navy-700">
                  <span className="text-gold-500 font-semibold text-sm">{price}</span>
                  <Link href="/register" className="btn-primary text-xs py-2 px-4">
                    Register <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 card-dark text-center">
            <h3 className="font-heading text-2xl font-bold text-white mb-3">Need a Custom Solution?</h3>
            <p className="text-navy-400 mb-6">
              We tailor our services to your organisation's specific needs. Contact us to discuss a bespoke forensic training or consultancy program.
            </p>
            <Link href="/contact" className="btn-primary">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
