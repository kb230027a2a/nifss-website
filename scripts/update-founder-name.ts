import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.teamMember.update({
    where: { id: "aliyan-farhan-anjum" },
    data: { name: "TBC" },
  });
  console.log("Updated:", updated.name);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
