import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await prisma.contactMessage.create({ data: body });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}
