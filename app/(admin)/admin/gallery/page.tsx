"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, Star } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  featured: boolean;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/api/admin/gallery").then((r) => r.json()).then(setItems).finally(() => setLoading(false));
  }, []);

  const deleteItem = async (id: string) => {
    if (!confirm("Remove this image?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">Gallery</h1>
          <p className="text-navy-400 mt-1">Manage photo gallery</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Photo
        </button>
      </div>

      {showForm && (
        <GalleryForm onClose={() => setShowForm(false)} onSave={(item) => { setItems((prev) => [item, ...prev]); setShowForm(false); }} />
      )}

      {loading ? (
        <div className="text-center py-12 text-navy-500">Loading gallery...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="relative group rounded-xl overflow-hidden bg-navy-800 border border-navy-700 aspect-square">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-navy-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <div className="flex-1">
                  <p className="text-white text-xs font-medium truncate">{item.title}</p>
                  <p className="text-navy-400 text-xs capitalize">{item.category}</p>
                </div>
                <div className="flex gap-1">
                  {item.featured && <Star className="w-4 h-4 text-gold-500 fill-gold-500" />}
                  <button onClick={() => deleteItem(item.id)} className="p-1 rounded bg-red-500/20 hover:bg-red-500/40 text-red-400">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center py-20 text-navy-500">No gallery items yet.</div>
          )}
        </div>
      )}
    </div>
  );
}

function GalleryForm({ onClose, onSave }: { onClose: () => void; onSave: (item: GalleryItem) => void }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", imageUrl: "", description: "", category: "event", featured: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    onSave(data);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-navy-900 border border-navy-700 rounded-2xl w-full max-w-md p-6">
        <h2 className="font-heading text-xl font-bold text-white mb-5">Add Photo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-navy-300 mb-1">Title *</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="block text-sm text-navy-300 mb-1">Image URL *</label>
            <input required type="url" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm text-navy-300 mb-1">Description</label>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="block text-sm text-navy-300 mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500">
              {["event", "workshop", "team", "media", "general"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-gold-500" />
            <span className="text-sm text-navy-300">Featured photo</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">{saving ? "Saving..." : "Add Photo"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
