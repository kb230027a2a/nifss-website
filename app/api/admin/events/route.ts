import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

function requireAdmin(session: any) {
  const role = session?.user?.role;
  if (!session || !["admin", "power_user"].includes(role)) return false;
  return true;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!requireAdmin(session)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const events = await prisma.event.findMany({ orderBy: { createdAt: "desc" }, include: { author: { select: { name: true } } } });
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!requireAdmin(session)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const slug = slugify(body.title) + "-" + Date.now();
  const event = await prisma.event.create({
    data: {
      ...body,
      slug,
      startDate: new Date(body.startDate),
      price: parseFloat(body.price ?? "0"),
      authorId: (session!.user as any).id,
    },
    include: { author: { select: { name: true } } },
  });
  return NextResponse.json(event);
}
