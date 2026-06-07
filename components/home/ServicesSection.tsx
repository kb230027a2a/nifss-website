"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Microscope, Camera, Package, BarChart3, Calendar } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Forensic Consultancy",
    desc: "Expert forensic consulting for LEAs, legal teams, and institutions to enhance investigation quality.",
    price: "From PKR 25,000",
  },
  {
    icon: Microscope,
    title: "Forensic Workshop",
    desc: "Practical hands-on training on forensic science fundamentals, methodologies, and best practices.",
    price: "From PKR 5,000",
  },
  {
    icon: Camera,
    title: "Crime Scene Recording",
    desc: "Professional training on crime scene photography, documentation, and digital recording techniques.",
    price: "From PKR 7,500",
  },
  {
    icon: Package,
    title: "Evidence Collection & Packaging",
    desc: "Comprehensive workshop on proper evidence handling, collection, and chain of custody protocols.",
    price: "From PKR 7,500",
  },
  {
    icon: BarChart3,
    title: "Leadership Course",
    desc: "Strategic leadership training for forensic professionals and law enforcement officers.",
    price: "From PKR 15,000",
  },
  {
    icon: Calendar,
    title: "Event Management",
    desc: "Professional forensic and legal event organisation, conferences, and symposium management.",
    price: "From PKR 50,000",
  },
];

export function ServicesSection() {
  return (
    <section className="section-padding bg-navy-900/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-3 py-1 mb-4">
            <span className="text-gold-400 text-xs font-medium uppercase tracking-wider">What We Offer</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-white mb-4">
            Our <span className="text-gold-500">Services</span>
          </h2>
          <p className="text-navy-400 max-w-2xl mx-auto">
            Comprehensive forensic science services and training programs designed to elevate
            professional standards across Pakistan's justice and security sector.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc, price }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="card-dark group hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-4 group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-300">
                <Icon className="w-6 h-6 text-gold-500 group-hover:text-navy-950 transition-colors duration-300" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2">{title}</h3>
              <p className="text-navy-400 text-sm leading-relaxed mb-4">{desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-gold-500 text-sm font-medium">{price}</span>
                <Link href="/services" className="text-xs text-navy-400 hover:text-gold-400 transition-colors">
                  Learn more →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/services" className="btn-secondary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
