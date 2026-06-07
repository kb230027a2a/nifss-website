import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const PAYPAL_API = process.env.NODE_ENV === "production"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

async function getPayPalToken() {
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, organization, membershipType, amount, eventId, notes } = body;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const usdAmount = (amount / 280).toFixed(2); // PKR to USD approx

    const registration = await prisma.registration.create({
      data: { firstName, lastName, email, phone, organization, membershipType, amount, currency: "PKR", eventId: eventId || null, paymentMethod: "paypal", paymentStatus: "pending", notes },
    });

    const token = await getPayPalToken();

    const order = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          amount: { currency_code: "USD", value: usdAmount },
          description: `NIFSS ${membershipType} Membership`,
          custom_id: registration.id,
        }],
        application_context: {
          return_url: `${appUrl}/register/success?reg=${registration.id}&method=paypal`,
          cancel_url: `${appUrl}/register?cancelled=1`,
        },
      }),
    }).then((r) => r.json());

    const approvalUrl = order.links?.find((l: any) => l.rel === "approve")?.href;
    return NextResponse.json({ approvalUrl, orderId: order.id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
