import type { Metadata } from "next";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Photo Gallery" };

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  }).catch(() => []);

  const categories = ["all", ...Array.from(new Set(items.map((i) => i.category)))];

  return (
    <div className="pt-20">
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.1)_0%,_transparent_60%)]" />
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-3 py-1 mb-4">
            <span className="text-gold-400 text-xs font-medium uppercase tracking-wider">Visual Journey</span>
          </div>
          <h1 className="font-heading text-5xl font-bold text-white mb-6">
            Photo <span className="text-gold-500">Gallery</span>
          </h1>
          <p className="text-navy-300 text-xl max-w-xl mx-auto">
            A glimpse into our workshops, events, and forensic activities across Pakistan.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {items.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="break-inside-avoid rounded-xl overflow-hidden bg-navy-900 border border-navy-700 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <div>
                        <p className="text-white text-sm font-medium">{item.title}</p>
                        {item.description && <p className="text-navy-300 text-xs">{item.description}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-navy-500">
              <p className="text-lg">Gallery coming soon. Check back after our next event!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
