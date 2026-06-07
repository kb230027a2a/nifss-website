"use client";
import { motion } from "framer-motion";

const stats = [
  { value: "10+", label: "Universities Reached" },
  { value: "500+", label: "Professionals Trained" },
  { value: "3+", label: "Years of Impact" },
  { value: "15+", label: "Expert Team Members" },
];

export function StatsSection() {
  return (
    <section className="py-12 bg-navy-900/50 border-y border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-heading font-bold text-gold-500 mb-1">{value}</div>
              <div className="text-navy-400 text-sm">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
