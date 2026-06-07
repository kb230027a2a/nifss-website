import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!["admin", "power_user"].includes((session?.user as any)?.role)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" }, include: { author: { select: { name: true } } } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!["admin", "power_user"].includes((session?.user as any)?.role)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const slug = slugify(body.title) + "-" + Date.now();
  const post = await prisma.blogPost.create({
    data: { ...body, slug, authorId: (session!.user as any).id, publishedAt: body.status === "published" ? new Date() : null },
    include: { author: { select: { name: true } } },
  });
  return NextResponse.json(post);
}
