import type { Metadata } from "next";
import { CheckCircle2, Target, Eye, Heart } from "lucide-react";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.1)_0%,_transparent_60%)]" />
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-3 py-1 mb-4">
            <span className="text-gold-400 text-xs font-medium uppercase tracking-wider">Our Story</span>
          </div>
          <h1 className="font-heading text-5xl font-bold text-white mb-6">
            About <span className="text-gold-500">NIFSS</span>
          </h1>
          <p className="text-navy-300 text-xl max-w-3xl mx-auto">
            Pakistan's first think tank combining the fields of Forensics & Strategic Studies.
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="card-dark mb-10">
              <h2 className="font-heading text-3xl font-bold text-gold-500 mb-6">Who We Are</h2>
              <div className="space-y-4 text-navy-300 leading-relaxed">
                <p>
                  The Nür Institute of Forensic & Strategic Studies (NIFSS) is first of its kind think tank,
                  which combines the fields of Forensics & Strategic Studies together. It aims to proffer
                  awareness in the field of Forensics specially in the third world countries like Pakistan
                  where this field of study is still in its developing stage.
                </p>
                <p>
                  NIFSS has already started its footprint by giving awareness talks & organising forensic
                  workshops in leading universities of Islamabad, NIA, PAF & Podcasts in Radio Pakistan.
                </p>
                <p>
                  Our experts have extensively researched the causes of low conviction rate in Pakistani
                  courts, specially due to lack of forensic awareness, practices & infrastructure. NIFSS
                  is already advising our LEAs to refine their forensic practices.
                </p>
                <p>
                  Our goal is to align Forensic strategic analysis in line with developed countries. We aim
                  to provide top class forensic consultancy, organise awareness workshops & bring together
                  the forensic professionals, academia & practitioners to enhance the body of knowledge in
                  the field of forensic science & strategic studies.
                </p>
              </div>
            </div>

            {/* Mission / Vision / Values */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  text: "To advance forensic science awareness and practice in Pakistan, bridging the gap between academic knowledge and real-world application in law enforcement and the justice system.",
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  text: "A Pakistan where forensic science is fully integrated into the justice system, resulting in fair, evidence-based convictions and a safer, more just society.",
                },
                {
                  icon: Heart,
                  title: "Our Values",
                  text: "Integrity, scientific rigour, community service, and the relentless pursuit of justice through evidence. We believe truth lies in facts, not assumptions.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="card-dark text-center">
                  <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-gold-500" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-navy-400 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            {/* Key Achievements */}
            <div className="card-dark">
              <h2 className="font-heading text-2xl font-bold text-white mb-6">Key Achievements</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {[
                  "Forensic workshops at QAU Islamabad",
                  "Training sessions at National Investigation Agency (NIA)",
                  "Awareness programs at Pakistan Air Force (PAF)",
                  "Forensic podcasts on Radio Pakistan",
                  "Advising Law Enforcement Agencies (LEAs)",
                  "Research on Pakistan's conviction rate challenges",
                  "Radiological Crime Scene Handling Workshop",
                  "Digital forensics awareness programs",
                ].map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-navy-300">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
