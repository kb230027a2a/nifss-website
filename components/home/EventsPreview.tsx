"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string | null;
  startDate: Date;
  price: number;
  currency: string;
  category: string;
}

export function EventsPreview({ events }: { events: Event[] }) {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-gold-400 text-xs font-medium uppercase tracking-wider">Upcoming</span>
            </div>
            <h2 className="font-heading text-4xl font-bold text-white">
              Events & <span className="text-gold-500">Workshops</span>
            </h2>
          </div>
          <Link href="/events" className="btn-secondary mt-4 sm:mt-0">
            All Events <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {events.length === 0 ? (
          <div className="text-center py-20 text-navy-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No upcoming events. Check back soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-dark hover:border-gold-500/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-gold-500/10 text-gold-400 text-xs font-medium px-3 py-1 rounded-full capitalize">
                    {event.category}
                  </span>
                  {event.price === 0 ? (
                    <span className="text-green-400 text-xs font-medium">Free</span>
                  ) : (
                    <span className="text-gold-400 text-xs font-medium">{formatCurrency(event.price, event.currency)}</span>
                  )}
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                  {event.title}
                </h3>
                <p className="text-navy-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                <div className="space-y-2 text-sm text-navy-500 mb-5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold-500" />
                    {formatDate(event.startDate)}
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gold-500" />
                      {event.location}
                    </div>
                  )}
                </div>
                <Link href={`/events/${event.slug}`} className="btn-primary text-sm py-2 w-full justify-center">
                  Register Now
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
