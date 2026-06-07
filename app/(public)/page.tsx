import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesSection } from "@/components/home/ServicesSection";
import { EventsPreview } from "@/components/home/EventsPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CTASection } from "@/components/home/CTASection";
import { prisma } from "@/lib/db";

export default async function HomePage() {
  const [events, posts] = await Promise.all([
    prisma.event.findMany({
      where: { status: "published" },
      orderBy: { startDate: "asc" },
      take: 3,
      include: { author: { select: { name: true } } },
    }).catch(() => []),
    prisma.blogPost.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: { author: { select: { name: true } } },
    }).catch(() => []),
  ]);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutPreview />
      <ServicesSection />
      <EventsPreview events={events} />
      <BlogPreview posts={posts} />
      <CTASection />
    </>
  );
}
