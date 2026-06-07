import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Calendar, BookOpen, Users, MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  const [eventCount, blogCount, userCount, msgCount, regCount] = await Promise.all([
    prisma.event.count().catch(() => 0),
    prisma.blogPost.count().catch(() => 0),
    prisma.user.count().catch(() => 0),
    prisma.contactMessage.count({ where: { read: false } }).catch(() => 0),
    prisma.registration.count().catch(() => 0),
  ]);

  const recentRegs = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  }).catch(() => []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-white">
          Welcome back, {session?.user?.name?.split(" ")[0]}
        </h1>
        <p className="text-navy-400 mt-1">Here's what's happening with NIFSS today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {[
          { label: "Total Events", value: eventCount, icon: Calendar, href: "/admin/events", color: "text-blue-400" },
          { label: "Blog Posts", value: blogCount, icon: BookOpen, href: "/admin/blog", color: "text-green-400" },
          { label: "Members", value: userCount, icon: Users, href: "/admin/users", color: "text-gold-400" },
          { label: "New Messages", value: msgCount, icon: MessageSquare, href: "/admin/messages", color: "text-purple-400" },
        ].map(({ label, value, icon: Icon, href, color }) => (
          <Link key={label} href={href} className="card-dark hover:border-gold-500/40 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <TrendingUp className="w-4 h-4 text-navy-600 group-hover:text-gold-500 transition-colors" />
            </div>
            <div className="text-3xl font-heading font-bold text-white">{value}</div>
            <div className="text-navy-500 text-sm">{label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        <div className="card-dark">
          <h2 className="font-heading text-lg font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: "/admin/events?new=1", label: "New Event", icon: Calendar },
              { href: "/admin/blog?new=1", label: "New Blog Post", icon: BookOpen },
              { href: "/admin/gallery", label: "Upload Photos", icon: Users },
              { href: "/admin/messages", label: "View Messages", icon: MessageSquare },
            ].map(({ href, label, icon: Icon }) => (
              <Link key={label} href={href} className="flex items-center gap-2 p-3 rounded-lg bg-navy-800 hover:bg-navy-700 text-navy-300 hover:text-gold-400 transition-colors text-sm">
                <Icon className="w-4 h-4" /> {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="card-dark">
          <h2 className="font-heading text-lg font-bold text-white mb-4">Recent Registrations</h2>
          {recentRegs.length > 0 ? (
            <div className="space-y-3">
              {recentRegs.map((r) => (
                <div key={r.id} className="flex items-center justify-between text-sm">
                  <div>
                    <div className="text-white font-medium">{r.firstName} {r.lastName}</div>
                    <div className="text-navy-500 text-xs">{r.email}</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${r.paymentStatus === "completed" ? "bg-green-500/10 text-green-400" : r.paymentStatus === "pending" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"}`}>
                      {r.paymentStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-navy-500 text-sm">No registrations yet.</p>}
        </div>
      </div>
    </div>
  );
}
