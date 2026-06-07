import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Shield, User } from "lucide-react";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "admin") redirect("/admin");

  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-white">Manage Users</h1>
        <p className="text-navy-400 mt-1">Admin-only: view and manage all registered users</p>
      </div>

      <div className="card-dark overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-navy-800 border-b border-navy-700">
            <tr>
              {["User", "Email", "Role", "Organisation", "Joined"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-navy-400 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-navy-800/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-gold-500" />
                    </div>
                    <span className="text-white font-medium">{user.name ?? "—"}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-navy-400">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 w-fit ${
                    user.role === "admin" ? "bg-red-500/10 text-red-400" :
                    user.role === "power_user" ? "bg-gold-500/10 text-gold-400" :
                    "bg-navy-700 text-navy-400"
                  }`}>
                    {user.role === "admin" && <Shield className="w-3 h-3" />}
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-navy-400">{user.organization ?? "—"}</td>
                <td className="px-4 py-3 text-navy-500 text-xs">{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
