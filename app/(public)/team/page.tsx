import type { Metadata } from "next";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Our Team" };

export default async function TeamPage() {
  const team = await prisma.teamMember.findMany({
    orderBy: { sortOrder: "asc" },
  }).catch(() => []);

  return (
    <div className="pt-20">
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.1)_0%,_transparent_60%)]" />
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-3 py-1 mb-4">
            <span className="text-gold-400 text-xs font-medium uppercase tracking-wider">The Experts</span>
          </div>
          <h1 className="font-heading text-5xl font-bold text-white mb-6">
            Meet the <span className="text-gold-500">Team</span>
          </h1>
          <p className="text-navy-300 text-xl max-w-2xl mx-auto">
            Pakistan's foremost forensic scientists, legal experts, and strategic analysts.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.id} className="card-dark text-center hover:border-gold-500/40 transition-all duration-300">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-500/20 to-navy-700 border-2 border-gold-500/30 flex items-center justify-center mx-auto mb-4">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="font-heading font-bold text-3xl text-gold-500">
                      {member.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-gold-500 text-sm font-medium mb-3">{member.title}</p>
                {member.bio && <p className="text-navy-400 text-sm leading-relaxed mb-4">{member.bio}</p>}
                <div className="flex justify-center gap-3">
                  {member.linkedin && (
                    <a href={member.linkedin} className="w-8 h-8 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-navy-400 flex items-center justify-center transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} className="w-8 h-8 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-navy-400 flex items-center justify-center transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="w-8 h-8 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-navy-400 flex items-center justify-center transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {team.length === 0 && (
            <div className="text-center py-20 text-navy-500">
              <p>Team information coming soon.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
