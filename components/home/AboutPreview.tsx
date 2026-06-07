"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const highlights = [
  "First think tank combining Forensics & Strategic Studies in Pakistan",
  "Workshops at QAU Islamabad, NIA, PAF & Radio Pakistan podcasts",
  "Advising Law Enforcement Agencies on forensic best practices",
  "Researching Pakistan's low conviction rates & forensic gaps",
];

export function AboutPreview() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-navy-900 border border-navy-700 aspect-[4/3]">
              <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-gold-500/10 border-2 border-gold-500/30 flex items-center justify-center mx-auto mb-6">
                    <span className="font-heading font-bold text-5xl text-gold-500">N</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">NIFSS</h3>
                  <p className="text-navy-400 text-sm">Nür Institute of Forensic & Strategic Studies</p>
                  <div className="mt-6 flex gap-2 justify-center">
                    {["Forensics", "Strategy", "Research"].map((tag) => (
                      <span key={tag} className="bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-gold-500/5 border border-gold-500/10 -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-navy-700/30 border border-navy-600/20 -z-10" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
              <span className="text-gold-400 text-xs font-medium uppercase tracking-wider">About NIFSS</span>
            </div>
            <h2 className="font-heading text-4xl font-bold text-white mb-6">
              Pakistan's Premier <span className="text-gold-500">Forensic Think Tank</span>
            </h2>
            <p className="text-navy-300 leading-relaxed mb-6">
              The Nür Institute of Forensic & Strategic Studies (NIFSS) is the first of its kind —
              combining the fields of Forensics and Strategic Studies to address critical gaps in
              Pakistan's justice system.
            </p>
            <p className="text-navy-400 leading-relaxed mb-8 text-sm">
              Our goal is to align forensic strategic analysis in line with developed countries,
              bringing together forensic professionals, academia, and practitioners to enhance
              the body of knowledge in forensic science.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-navy-300">
                  <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/about" className="btn-primary">
              Our Full Story <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
