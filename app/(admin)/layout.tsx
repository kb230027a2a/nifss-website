import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;

  if (!session || !["admin", "power_user"].includes(role)) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex bg-navy-950">
      <AdminSidebar role={role} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
