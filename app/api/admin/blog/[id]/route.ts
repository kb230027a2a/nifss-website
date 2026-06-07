import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!["admin", "power_user"].includes((session?.user as any)?.role)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const post = await prisma.blogPost.update({ where: { id: params.id }, data: body });
  return NextResponse.json(post);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!["admin", "power_user"].includes((session?.user as any)?.role)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await prisma.blogPost.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
