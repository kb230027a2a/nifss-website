import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { MessageSquare, Mail } from "lucide-react";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-white">Contact Messages</h1>
        <p className="text-navy-400 mt-1">{messages.filter((m) => !m.read).length} unread messages</p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="card-dark text-center py-12 text-navy-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No messages yet.</p>
          </div>
        ) : messages.map((msg) => (
          <div key={msg.id} className={`card-dark ${!msg.read ? "border-gold-500/30" : ""}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{msg.name}</span>
                  {!msg.read && <span className="w-2 h-2 rounded-full bg-gold-500" />}
                </div>
                <div className="flex items-center gap-2 text-navy-400 text-sm mt-1">
                  <Mail className="w-3 h-3" />
                  <a href={`mailto:${msg.email}`} className="hover:text-gold-400">{msg.email}</a>
                  {msg.phone && <span>· {msg.phone}</span>}
                </div>
              </div>
              <span className="text-navy-500 text-xs">{formatDate(msg.createdAt)}</span>
            </div>
            <div className="text-gold-400 font-medium text-sm mb-2">{msg.subject}</div>
            <p className="text-navy-300 text-sm leading-relaxed">{msg.message}</p>
            <div className="mt-3">
              <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`} className="btn-secondary text-xs py-1.5 px-3">
                Reply
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
