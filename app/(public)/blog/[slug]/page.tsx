import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, User, ArrowLeft, Tag } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } }).catch(() => null);
  return { title: post?.title ?? "Blog" };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, status: "published" },
    include: { author: { select: { name: true } } },
  }).catch(() => null);

  if (!post) notFound();

  const related = await prisma.blogPost.findMany({
    where: { status: "published", category: post.category, id: { not: post.id } },
    take: 3,
    orderBy: { publishedAt: "desc" },
  }).catch(() => []);

  const tags: string[] = JSON.parse(post.tags || "[]");

  return (
    <div className="pt-20">
      <section className="relative py-20 bg-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative">
          <Link href="/blog" className="flex items-center gap-2 text-navy-400 hover:text-gold-400 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="max-w-3xl">
            <span className="bg-gold-500/10 text-gold-400 text-xs font-medium px-3 py-1 rounded-full capitalize mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6">{post.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-navy-400">
              <span className="flex items-center gap-2"><User className="w-4 h-4 text-gold-500" />{post.author.name}</span>
              {post.publishedAt && <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-gold-500" />{formatDate(post.publishedAt)}</span>}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-10">
            <article className="lg:col-span-3">
              <div className="card-dark">
                <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose-dark text-navy-300 leading-relaxed [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gold-400 [&_h2]:mt-8 [&_h2]:mb-4 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-4 [&_li]:text-navy-300" />
                {tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-navy-700 flex flex-wrap gap-2">
                    <Tag className="w-4 h-4 text-gold-500 mt-0.5" />
                    {tags.map((tag) => (
                      <span key={tag} className="bg-navy-800 text-navy-400 text-xs px-3 py-1 rounded-full">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>

            <aside>
              <div className="card-dark sticky top-24">
                <h3 className="font-heading text-lg font-bold text-white mb-4">Related Articles</h3>
                {related.length > 0 ? (
                  <div className="space-y-4">
                    {related.map((r) => (
                      <Link key={r.id} href={`/blog/${r.slug}`} className="block text-sm text-navy-400 hover:text-gold-400 transition-colors pb-4 border-b border-navy-700 last:border-0">
                        {r.title}
                      </Link>
                    ))}
                  </div>
                ) : <p className="text-navy-500 text-sm">No related articles.</p>}

                <div className="mt-6 pt-6 border-t border-navy-700">
                  <h4 className="text-sm font-semibold text-white mb-3">Stay Updated</h4>
                  <Link href="/register" className="btn-primary text-sm py-2 w-full justify-center">
                    Join NIFSS
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
