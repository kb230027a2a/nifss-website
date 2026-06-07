"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.15)_0%,_transparent_70%)]" />

      <div className="relative container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-3 py-1 mb-6">
            <span className="text-gold-400 text-xs font-medium uppercase tracking-wider">Join the Movement</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6">
            Be Part of Pakistan's <br />
            <span className="text-gold-500">Forensic Revolution</span>
          </h2>
          <p className="text-navy-300 text-lg max-w-2xl mx-auto mb-10">
            Whether you're a forensic professional, legal practitioner, student, or institution —
            NIFSS has a place for you. Join our growing community.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register" className="btn-primary text-base px-8 py-4">
              Register Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-secondary text-base px-8 py-4">
              <Mail className="w-5 h-5" /> Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
