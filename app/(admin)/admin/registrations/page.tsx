import { prisma } from "@/lib/db";
import { formatDate, formatCurrency } from "@/lib/utils";

export default async function AdminRegistrationsPage() {
  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
    include: { event: { select: { title: true } } },
  }).catch(() => []);

  const totalRevenue = registrations.filter((r) => r.paymentStatus === "completed").reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">Registrations</h1>
          <p className="text-navy-400 mt-1">{registrations.length} total registrations</p>
        </div>
        <div className="card-dark text-right">
          <div className="text-navy-400 text-sm">Total Revenue</div>
          <div className="text-gold-500 font-heading text-2xl font-bold">PKR {totalRevenue.toLocaleString()}</div>
        </div>
      </div>

      <div className="card-dark overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-navy-800 border-b border-navy-700">
            <tr>
              {["Registrant", "Membership", "Amount", "Payment", "Status", "Date"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-navy-400 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-800">
            {registrations.map((reg) => (
              <tr key={reg.id} className="hover:bg-navy-800/50">
                <td className="px-4 py-3">
                  <div className="text-white font-medium">{reg.firstName} {reg.lastName}</div>
                  <div className="text-navy-500 text-xs">{reg.email}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="bg-navy-700 text-navy-300 text-xs px-2 py-1 rounded capitalize">{reg.membershipType}</span>
                </td>
                <td className="px-4 py-3 text-gold-400 font-medium">PKR {reg.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-navy-400 capitalize text-xs">{reg.paymentMethod ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    reg.paymentStatus === "completed" ? "bg-green-500/10 text-green-400" :
                    reg.paymentStatus === "pending" ? "bg-yellow-500/10 text-yellow-400" :
                    "bg-red-500/10 text-red-400"
                  }`}>
                    {reg.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-navy-500 text-xs">{formatDate(reg.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {registrations.length === 0 && (
          <div className="p-8 text-center text-navy-500">No registrations yet.</div>
        )}
      </div>
    </div>
  );
}
