import type { Metadata } from "next";
import Link from "next/link";
import { Clock, User, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Blog & Research" };

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
    include: { author: { select: { name: true } } },
  }).catch(() => []);

  const featured = posts.filter((p) => p.featured);
  const regular = posts.filter((p) => !p.featured);

  return (
    <div className="pt-20">
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.1)_0%,_transparent_60%)]" />
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-3 py-1 mb-4">
            <span className="text-gold-400 text-xs font-medium uppercase tracking-wider">Insights & Research</span>
          </div>
          <h1 className="font-heading text-5xl font-bold text-white mb-6">
            Blog & <span className="text-gold-500">Research</span>
          </h1>
          <p className="text-navy-300 text-xl max-w-2xl mx-auto">
            Expert analysis, research findings, and forensic science insights from NIFSS.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {featured.length > 0 && (
            <div className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-white mb-6">Featured</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featured.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="card-dark hover:border-gold-500/40 transition-all duration-300 group block">
                    <span className="bg-gold-500/10 text-gold-400 text-xs font-medium px-3 py-1 rounded-full mb-4 inline-block">
                      {post.category}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-navy-400 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-navy-500">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author.name}</span>
                      {post.publishedAt && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(post.publishedAt)}</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {regular.length > 0 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-6">All Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {regular.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="card-dark hover:border-gold-500/40 transition-all duration-300 group flex flex-col">
                    <span className="bg-navy-800 text-navy-400 text-xs font-medium px-3 py-1 rounded-full mb-4 w-fit">{post.category}</span>
                    <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors line-clamp-2 flex-1">
                      {post.title}
                    </h3>
                    <p className="text-navy-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-1 text-gold-400 text-sm mt-auto">
                      Read more <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {posts.length === 0 && (
            <div className="text-center py-20 text-navy-500">
              <p className="text-lg">No articles published yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
