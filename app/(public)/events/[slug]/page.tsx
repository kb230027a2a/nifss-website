import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatDate, formatCurrency } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = await prisma.event.findUnique({ where: { slug: params.slug } }).catch(() => null);
  return { title: event?.title ?? "Event" };
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await prisma.event.findUnique({
    where: { slug: params.slug, status: "published" },
    include: { author: { select: { name: true } } },
  }).catch(() => null);

  if (!event) notFound();

  return (
    <div className="pt-20">
      <section className="relative py-20 bg-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative">
          <Link href="/events" className="flex items-center gap-2 text-navy-400 hover:text-gold-400 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
          <div className="max-w-4xl">
            <span className="bg-gold-500/10 text-gold-400 text-xs font-medium px-3 py-1 rounded-full capitalize mb-4 inline-block">
              {event.category}
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-sm text-navy-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-500" />
                {formatDate(event.startDate)}
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold-500" />
                  {event.venue ?? event.location}
                </div>
              )}
              {event.capacity && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold-500" />
                  Capacity: {event.capacity} seats
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="card-dark prose-dark max-w-none">
                <div dangerouslySetInnerHTML={{ __html: event.content }} className="text-navy-300 leading-relaxed" />
              </div>
            </div>
            <div>
              <div className="card-dark sticky top-24">
                <h3 className="font-heading text-xl font-bold text-white mb-5">Registration</h3>
                <div className="text-3xl font-heading font-bold text-gold-500 mb-1">
                  {event.price === 0 ? "Free" : formatCurrency(event.price, event.currency)}
                </div>
                <p className="text-navy-500 text-sm mb-6">per participant</p>
                <Link href={`/register?event=${event.id}`} className="btn-primary w-full justify-center mb-4">
                  Register Now
                </Link>
                <Link href="/contact" className="btn-secondary w-full justify-center text-sm">
                  Have Questions?
                </Link>
                <div className="mt-6 pt-6 border-t border-navy-700 space-y-3 text-sm text-navy-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold-500" />
                    {formatDate(event.startDate)}
                  </div>
                  {event.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold-500" />{event.location}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
