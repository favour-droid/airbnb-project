// app/success/page.tsx
import { redirect } from "next/navigation";
import prisma from "@/app/lib/db";
import Stripe from "stripe";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) return redirect("/");

  // Retrieve the session from Stripe to get metadata
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const homeId = session.metadata?.homeId;
  const userId = session.metadata?.userId;

  // Update the reservation paymentStatus to "paid"
  if (homeId && userId) {
    await prisma.reservation.updateMany({
      where: {
        homeId,
        userId,
        paymentStatus: "pending",
      },
      data: {
        paymentStatus: "paid",
      },
    });
  }

  return (
    <div className="container mx-auto text-center mt-20 flex flex-col items-center gap-6">
      <div className="text-6xl">🎉</div>
      <h1 className="text-3xl font-bold">Payment Successful!</h1>
      <p className="text-muted-foreground max-w-md">
        Your reservation has been confirmed. You can view and manage it in your
        reservations page.
      </p>
      <Button asChild>
        <Link href="/reservations">View My Reservations</Link>
      </Button>
    </div>
  );
}