import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("Admin@NIFSS2024", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@nifss.org" },
    update: {},
    create: {
      email: "admin@nifss.org",
      name: "NIFSS Admin",
      password: adminPassword,
      role: "admin",
    },
  });

  // Create power user
  const pwPassword = await bcrypt.hash("PowerUser@NIFSS2024", 12);
  await prisma.user.upsert({
    where: { email: "editor@nifss.org" },
    update: {},
    create: {
      email: "editor@nifss.org",
      name: "NIFSS Editor",
      password: pwPassword,
      role: "power_user",
    },
  });

  // Seed team members
  const team = [
    {
      name: "Aisha Wasif",
      title: "Founder & Chairman",
      bio: "With an extensive background in forensic science and strategic studies, Aliyan leads NIFSS with a vision to transform forensic practices in Pakistan.",
      sortOrder: 1,
    },
    {
      name: "Aafiya Majid",
      title: "Research Director",
      bio: "A forensic researcher specialising in digital forensics and crime scene investigation, currently leading forensic research at NIFSS.",
      sortOrder: 2,
    },
    {
      name: "Legal Advisor Fariha Tahir",
      title: "Legal Advisor",
      bio: "An experienced legal professional providing strategic legal guidance on forensic evidence standards and judicial processes in Pakistan.",
      sortOrder: 3,
    },
  ];

  for (const member of team) {
    await prisma.teamMember.upsert({
      where: { id: member.name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: { ...member, id: member.name.toLowerCase().replace(/\s+/g, "-") },
    });
  }

  // Seed sample blog posts
  const blog1 = await prisma.blogPost.upsert({
    where: { slug: "forensic-awareness-in-pakistan" },
    update: {},
    create: {
      title: "Raising Forensic Awareness in Pakistan",
      slug: "forensic-awareness-in-pakistan",
      excerpt: "NIFSS continues its mission to bring forensic science awareness to leading universities across Pakistan.",
      content: `<h2>The State of Forensic Science in Pakistan</h2><p>Pakistan's judicial system faces significant challenges due to low conviction rates, many of which stem from inadequate forensic awareness and infrastructure. NIFSS has been at the forefront of addressing these challenges...</p><p>Through workshops at leading universities including QAU Islamabad, NIA, and PAF, NIFSS experts have reached thousands of students and professionals.</p>`,
      category: "Research",
      tags: JSON.stringify(["forensics", "Pakistan", "awareness", "education"]),
      status: "published",
      featured: true,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  });

  const blog2 = await prisma.blogPost.upsert({
    where: { slug: "low-conviction-rates-forensic-gap" },
    update: {},
    create: {
      title: "Understanding Pakistan's Low Conviction Rate: The Forensic Gap",
      slug: "low-conviction-rates-forensic-gap",
      excerpt: "Our experts have extensively researched the causes of low conviction rates in Pakistani courts, particularly due to lack of forensic practices.",
      content: `<h2>The Forensic Evidence Problem</h2><p>Pakistan's courts face a persistent challenge: conviction rates remain alarmingly low compared to international standards. Our research at NIFSS points to a critical gap — the lack of forensic awareness and proper evidence collection practices.</p><p>International studies show that proper forensic evidence can improve conviction accuracy by up to 80%. Pakistan needs to bridge this gap urgently.</p>`,
      category: "Policy",
      tags: JSON.stringify(["conviction", "courts", "forensics", "policy"]),
      status: "published",
      featured: false,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  });

  // Seed sample events
  await prisma.event.upsert({
    where: { slug: "forensic-workshop-islamabad-2024" },
    update: {},
    create: {
      title: "Forensic Crime Scene Investigation Workshop",
      slug: "forensic-workshop-islamabad-2024",
      description: "Hands-on workshop covering crime scene investigation, evidence collection, and forensic analysis techniques.",
      content: `<p>Join NIFSS for an intensive hands-on workshop on forensic crime scene investigation. This workshop is designed for law enforcement officers, legal professionals, and forensic science students.</p><h3>What you will learn:</h3><ul><li>Crime scene documentation and photography</li><li>Evidence collection and preservation techniques</li><li>Chain of custody protocols</li><li>Forensic analysis methods</li></ul>`,
      location: "Islamabad",
      venue: "Quaid-i-Azam University, Islamabad",
      startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000),
      price: 5000,
      currency: "PKR",
      capacity: 50,
      status: "published",
      featured: true,
      category: "workshop",
      authorId: admin.id,
    },
  });

  console.log("✅ Seed completed successfully");
  console.log(`Admin: admin@nifss.org / Admin@NIFSS2024`);
  console.log(`Editor: editor@nifss.org / PowerUser@NIFSS2024`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
