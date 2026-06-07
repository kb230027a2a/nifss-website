import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatDate, formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Events & Workshops" };

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { status: "published" },
    orderBy: { startDate: "asc" },
    include: { author: { select: { name: true } } },
  }).catch(() => []);

  const upcoming = events.filter((e) => new Date(e.startDate) >= new Date());
  const past = events.filter((e) => new Date(e.startDate) < new Date());

  return (
    <div className="pt-20">
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.1)_0%,_transparent_60%)]" />
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-3 py-1 mb-4">
            <span className="text-gold-400 text-xs font-medium uppercase tracking-wider">Events & Workshops</span>
          </div>
          <h1 className="font-heading text-5xl font-bold text-white mb-6">
            Upcoming <span className="text-gold-500">Events</span>
          </h1>
          <p className="text-navy-300 text-xl max-w-2xl mx-auto">
            Join our forensic workshops, seminars, and conferences across Pakistan.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {upcoming.length > 0 ? (
            <>
              <h2 className="font-heading text-2xl font-bold text-white mb-8">Upcoming Events</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {upcoming.map((event) => (
                  <div key={event.id} className="card-dark hover:border-gold-500/40 transition-all duration-300 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-gold-500/10 text-gold-400 text-xs font-medium px-3 py-1 rounded-full capitalize">
                        {event.category}
                      </span>
                      {event.price === 0 ? (
                        <span className="text-green-400 text-xs">Free</span>
                      ) : (
                        <span className="text-gold-400 text-xs">{formatCurrency(event.price, event.currency)}</span>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-navy-400 text-sm mb-4 flex-1 line-clamp-3">{event.description}</p>
                    <div className="space-y-2 mb-5 text-sm text-navy-500">
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
                      View Details & Register
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-navy-500 mb-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg">No upcoming events scheduled. Check back soon!</p>
            </div>
          )}

          {past.length > 0 && (
            <>
              <h2 className="font-heading text-2xl font-bold text-white mb-8">Past Events</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {past.map((event) => (
                  <div key={event.id} className="card-dark opacity-70 flex flex-col">
                    <span className="bg-navy-700 text-navy-400 text-xs font-medium px-3 py-1 rounded-full capitalize w-fit mb-4">
                      {event.category} · Completed
                    </span>
                    <h3 className="font-heading text-lg font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-navy-500 text-sm mb-4 flex-1 line-clamp-2">{event.description}</p>
                    <div className="flex items-center gap-2 text-sm text-navy-600">
                      <Calendar className="w-4 h-4" />
                      {formatDate(event.startDate)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
