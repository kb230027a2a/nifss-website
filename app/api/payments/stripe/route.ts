import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, organization, membershipType, amount, currency, eventId, notes } = body;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    // Create registration record (pending)
    const registration = await prisma.registration.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        organization,
        membershipType,
        amount,
        currency,
        eventId: eventId || null,
        paymentMethod: "stripe",
        paymentStatus: "pending",
        notes,
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase() === "pkr" ? "usd" : currency.toLowerCase(),
            product_data: {
              name: `NIFSS ${membershipType.charAt(0).toUpperCase() + membershipType.slice(1)} Membership`,
              description: "Nür Institute of Forensic & Strategic Studies",
            },
            unit_amount: currency === "PKR" ? Math.round(amount / 280 * 100) : amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      success_url: `${appUrl}/register/success?session_id={CHECKOUT_SESSION_ID}&reg=${registration.id}`,
      cancel_url: `${appUrl}/register?cancelled=1`,
      metadata: { registrationId: registration.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
