"use client";
import { useState, useEffect } from "react";
import { Plus, Eye, Trash2, BookOpen } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  featured: boolean;
  publishedAt: string | null;
  author: { name: string | null };
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/api/admin/blog").then((r) => r.json()).then(setPosts).finally(() => setLoading(false));
  }, []);

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleStatus = async (id: string, status: string) => {
    const newStatus = status === "published" ? "draft" : "published";
    await fetch(`/api/admin/blog/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: newStatus, publishedAt: newStatus === "published" ? new Date() : null }) });
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, status: newStatus } : p));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">Blog Posts</h1>
          <p className="text-navy-400 mt-1">Manage articles and research publications</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {showForm && <BlogForm onClose={() => setShowForm(false)} onSave={(p) => { setPosts((prev) => [p, ...prev]); setShowForm(false); }} />}

      <div className="card-dark overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-navy-500">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-navy-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No posts yet. Write your first article.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-navy-800 border-b border-navy-700">
              <tr>
                {["Title", "Category", "Author", "Status", "Published", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-navy-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-navy-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-white font-medium line-clamp-1">{post.title}</div>
                    <div className="text-navy-500 text-xs">{post.slug}</div>
                  </td>
                  <td className="px-4 py-3"><span className="bg-navy-700 text-navy-300 text-xs px-2 py-1 rounded">{post.category}</span></td>
                  <td className="px-4 py-3 text-navy-400">{post.author.name}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(post.id, post.status)} className={`text-xs px-2 py-1 rounded-full cursor-pointer ${post.status === "published" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                      {post.status}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-navy-400 text-xs">{post.publishedAt ? formatDate(post.publishedAt) : "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <a href={`/blog/${post.slug}`} target="_blank" className="p-1.5 rounded hover:bg-navy-700 text-navy-400 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </a>
                      <button onClick={() => deletePost(post.id)} className="p-1.5 rounded hover:bg-red-500/10 text-navy-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function BlogForm({ onClose, onSave }: { onClose: () => void; onSave: (p: Post) => void }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", category: "Research", tags: "", status: "draft", featured: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, tags: JSON.stringify(form.tags.split(",").map((t) => t.trim()).filter(Boolean)) }) });
    const data = await res.json();
    onSave(data);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-navy-900 border border-navy-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <h2 className="font-heading text-xl font-bold text-white mb-5">Create Blog Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-navy-300 mb-1">Title *</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="block text-sm text-navy-300 mb-1">Excerpt *</label>
            <textarea required value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500 resize-none" />
          </div>
          <div>
            <label className="block text-sm text-navy-300 mb-1">Content (HTML)</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500 resize-none font-mono" placeholder="<h2>Introduction</h2><p>...</p>" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-navy-300 mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500">
                {["Research", "Policy", "Workshop", "News", "Opinion"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-navy-300 mb-1">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-navy-300 mb-1">Tags (comma separated)</label>
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500" placeholder="forensics, Pakistan, crime" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-gold-500" />
            <span className="text-sm text-navy-300">Featured post</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">{saving ? "Saving..." : "Create Post"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
