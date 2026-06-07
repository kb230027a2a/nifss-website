"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: Date | null;
  author: { name: string | null };
}

export function BlogPreview({ posts }: { posts: Post[] }) {
  return (
    <section className="section-padding bg-navy-900/20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-gold-400 text-xs font-medium uppercase tracking-wider">Insights</span>
            </div>
            <h2 className="font-heading text-4xl font-bold text-white">
              Latest <span className="text-gold-500">Research & Blog</span>
            </h2>
          </div>
          <Link href="/blog" className="btn-secondary mt-4 sm:mt-0">
            All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-dark hover:border-gold-500/40 transition-all duration-300 group flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="bg-gold-500/10 text-gold-400 text-xs font-medium px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-navy-400 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-navy-700">
                <div className="flex items-center gap-2 text-xs text-navy-500">
                  <User className="w-3 h-3" />
                  {post.author.name ?? "NIFSS"}
                </div>
                {post.publishedAt && (
                  <div className="flex items-center gap-1 text-xs text-navy-500">
                    <Clock className="w-3 h-3" />
                    {formatDate(post.publishedAt)}
                  </div>
                )}
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-4 text-gold-400 hover:text-gold-300 text-sm font-medium flex items-center gap-1 transition-colors">
                Read Article <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
