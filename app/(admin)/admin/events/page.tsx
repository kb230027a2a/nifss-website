"use client";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  slug: string;
  status: string;
  category: string;
  startDate: string;
  price: number;
  featured: boolean;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/api/admin/events").then((r) => r.json()).then(setEvents).finally(() => setLoading(false));
  }, []);

  const deleteEvent = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const toggleStatus = async (id: string, status: string) => {
    const newStatus = status === "published" ? "draft" : "published";
    await fetch(`/api/admin/events/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: newStatus }) });
    setEvents((prev) => prev.map((e) => e.id === id ? { ...e, status: newStatus } : e));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">Events</h1>
          <p className="text-navy-400 mt-1">Manage upcoming events and workshops</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus className="w-4 h-4" /> New Event
        </button>
      </div>

      {showForm && <EventForm onClose={() => setShowForm(false)} onSave={(e) => { setEvents((prev) => [e, ...prev]); setShowForm(false); }} />}

      <div className="card-dark overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-navy-500">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="p-8 text-center text-navy-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No events yet. Create your first event.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-navy-800 border-b border-navy-700">
              <tr>
                {["Title", "Date", "Category", "Price", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-navy-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-navy-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-white font-medium">{event.title}</div>
                    <div className="text-navy-500 text-xs">{event.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-navy-300">{formatDate(event.startDate)}</td>
                  <td className="px-4 py-3">
                    <span className="bg-navy-700 text-navy-300 text-xs px-2 py-1 rounded capitalize">{event.category}</span>
                  </td>
                  <td className="px-4 py-3 text-navy-300">PKR {event.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(event.id, event.status)} className={`text-xs px-2 py-1 rounded-full cursor-pointer ${event.status === "published" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                      {event.status}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <a href={`/events/${event.slug}`} target="_blank" className="p-1.5 rounded hover:bg-navy-700 text-navy-400 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </a>
                      <button onClick={() => deleteEvent(event.id)} className="p-1.5 rounded hover:bg-red-500/10 text-navy-400 hover:text-red-400 transition-colors">
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

function EventForm({ onClose, onSave }: { onClose: () => void; onSave: (e: Event) => void }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", content: "", location: "", venue: "", startDate: "", price: "0", category: "workshop", status: "draft" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    onSave(data);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-navy-900 border border-navy-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <h2 className="font-heading text-xl font-bold text-white mb-5">Create New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-navy-300 mb-1">Title *</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="block text-sm text-navy-300 mb-1">Short Description *</label>
            <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500 resize-none" />
          </div>
          <div>
            <label className="block text-sm text-navy-300 mb-1">Full Content (HTML)</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500 resize-none font-mono" placeholder="<p>Event details...</p>" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-navy-300 mb-1">Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500" placeholder="City" />
            </div>
            <div>
              <label className="block text-sm text-navy-300 mb-1">Venue</label>
              <input value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-navy-300 mb-1">Start Date *</label>
              <input required type="datetime-local" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500" />
            </div>
            <div>
              <label className="block text-sm text-navy-300 mb-1">Price (PKR)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500" />
            </div>
            <div>
              <label className="block text-sm text-navy-300 mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500">
                {["workshop", "conference", "seminar", "webinar"].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-navy-300 mb-1">Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">{saving ? "Saving..." : "Create Event"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
