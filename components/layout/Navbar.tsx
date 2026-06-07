"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, User, LogOut, Settings, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Services & Events",
    children: [
      { href: "/services", label: "Our Services" },
      { href: "/events", label: "Events & Workshops" },
      { href: "/register", label: "Register" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/team", label: "Our Team" },
  { href: "/contact", label: "Get in Touch" },
];

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const role = (session?.user as any)?.role;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-navy-950/95 backdrop-blur-md border-b border-navy-700 shadow-lg shadow-black/30"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center font-heading font-bold text-navy-950 text-lg group-hover:bg-gold-400 transition-colors">
                N
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-navy-600 border-2 border-gold-500" />
            </div>
            <div>
              <div className="text-gold-500 font-heading font-bold text-lg leading-tight">NIFSS</div>
              <div className="text-navy-300 text-xs leading-tight hidden sm:block">
                Nür Institute of Forensic &<br />Strategic Studies
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button
                    onClick={() => setDropdownOpen(dropdownOpen === link.label ? null : link.label)}
                    onBlur={() => setTimeout(() => setDropdownOpen(null), 150)}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-navy-200 hover:text-gold-400 transition-colors rounded-md"
                  >
                    {link.label}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", dropdownOpen === link.label && "rotate-180")} />
                  </button>
                  {dropdownOpen === link.label && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-navy-900 border border-navy-700 rounded-lg shadow-xl shadow-black/40 py-1 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-navy-200 hover:text-gold-400 hover:bg-navy-800 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                    pathname === link.href
                      ? "text-gold-400"
                      : "text-navy-200 hover:text-gold-400"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Auth / CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  onBlur={() => setTimeout(() => setUserMenuOpen(false), 150)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-navy-600 hover:border-gold-500 transition-colors text-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center">
                    <User className="w-4 h-4 text-gold-400" />
                  </div>
                  <span className="text-navy-200">{session.user?.name?.split(" ")[0]}</span>
                  <ChevronDown className="w-3 h-3 text-navy-400" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-navy-900 border border-navy-700 rounded-lg shadow-xl py-1">
                    {(role === "admin" || role === "power_user") && (
                      <Link href="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy-200 hover:text-gold-400 hover:bg-navy-800">
                        <Shield className="w-4 h-4" />
                        {role === "admin" ? "Admin Panel" : "Content Panel"}
                      </Link>
                    )}
                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy-200 hover:text-gold-400 hover:bg-navy-800">
                      <Settings className="w-4 h-4" />
                      My Profile
                    </Link>
                    <hr className="border-navy-700 my-1" />
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-navy-800"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-navy-200 hover:text-gold-400 transition-colors px-3 py-2">
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary text-sm py-2">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-navy-200 hover:text-gold-400 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy-950/98 border-b border-navy-700 backdrop-blur-md">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <div className="px-3 py-2 text-xs font-semibold text-gold-500 uppercase tracking-wider">
                    {link.label}
                  </div>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-6 py-2 text-sm text-navy-300 hover:text-gold-400"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-3 py-2.5 text-sm font-medium rounded-md",
                    pathname === link.href ? "text-gold-400 bg-navy-800" : "text-navy-200 hover:text-gold-400"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-4 border-t border-navy-700 flex flex-col gap-2">
              {session ? (
                <>
                  {(role === "admin" || role === "power_user") && (
                    <Link href="/admin" onClick={() => setMobileOpen(false)} className="btn-secondary text-sm justify-center">
                      <Shield className="w-4 h-4" /> Dashboard
                    </Link>
                  )}
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="btn-secondary text-sm justify-center text-red-400 border-red-400 hover:bg-red-400 hover:text-white">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-secondary text-sm justify-center">Sign In</Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-primary text-sm justify-center">Register Now</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
