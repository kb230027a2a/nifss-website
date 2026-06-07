"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, Calendar, BookOpen, Image, Users, MessageSquare,
  LogOut, Shield, Settings, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/events", icon: Calendar, label: "Events" },
  { href: "/admin/blog", icon: BookOpen, label: "Blog Posts" },
  { href: "/admin/gallery", icon: Image, label: "Gallery" },
  { href: "/admin/registrations", icon: Users, label: "Registrations" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
];

const adminOnlyLinks = [
  { href: "/admin/users", icon: Shield, label: "Manage Users" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminSidebar({ role }: { role: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-navy-900 border-r border-navy-700 flex flex-col min-h-screen">
      <div className="p-6 border-b border-navy-700">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center font-heading font-bold text-navy-950 text-lg">N</div>
          <div>
            <div className="text-gold-500 font-heading font-bold text-sm">NIFSS</div>
            <div className="text-navy-500 text-xs">{role === "admin" ? "Admin Panel" : "Content Panel"}</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <div className="text-xs font-semibold text-navy-500 uppercase tracking-wider mb-3 px-2">Content</div>
        {adminLinks.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname === href
                ? "bg-gold-500/10 text-gold-400 border border-gold-500/20"
                : "text-navy-400 hover:text-white hover:bg-navy-800"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
            {pathname === href && <ChevronRight className="w-3 h-3 ml-auto" />}
          </Link>
        ))}

        {role === "admin" && (
          <>
            <div className="text-xs font-semibold text-navy-500 uppercase tracking-wider mt-6 mb-3 px-2">Admin Only</div>
            {adminOnlyLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-gold-500/10 text-gold-400 border border-gold-500/20"
                    : "text-navy-400 hover:text-white hover:bg-navy-800"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </>
        )}
      </nav>

      <div className="p-4 border-t border-navy-700">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 w-full transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
