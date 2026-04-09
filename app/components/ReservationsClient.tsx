"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cancelReservation } from "../actions";

interface HomeData {
  id: string;
  paymentStatus: string;
  status: string;
  home: {
    id: string;
    region: string | null;
    town: string | null;
    description: string | null;
    photo: string | null;
    price: number | null;
  };
}

interface Props {
  data: HomeData[];
  userId: string;
}

// Single shared Pay button with loading state
function PayButton({
  homeId,
  price,
  userId,
}: {
  homeId: string;
  price: number;
  userId: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ homeId, price, userId }),
      });
      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      console.error("Payment error:", err);
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handlePay}
      disabled={loading}
      className="w-full mt-3"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Redirecting...
        </>
      ) : (
        "Pay Now"
      )}
    </Button>
  );
}

export function ReservationsClient({ data, userId }: Props) {
  const format = (text?: string | null) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
      {data.map((item) => {
        const isCancelled = item.status === "cancelled";
        const isPaid = item.paymentStatus === "paid";

        return (
          <div
            key={item.id}
            className={`flex flex-col rounded-lg border overflow-hidden ${
              isCancelled ? "opacity-60" : ""
            }`}
          >
            {/* Listing image */}
            <div className="relative h-56">
              <Image
                src={`https://bjkfbtygdoawiobrjzyd.supabase.co/storage/v1/object/public/images/${item.home.photo}`}
                alt="Home"
                fill
                className="object-cover"
              />
              {/* Status badge */}
              <div className="absolute top-2 left-2">
                {isCancelled ? (
                  <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                    Cancelled
                  </span>
                ) : isPaid ? (
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                    Paid ✓
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-1 rounded-full">
                    Pending Payment
                  </span>
                )}
              </div>
            </div>

            {/* Card body */}
            <div className="p-3 flex flex-col gap-2">
              <Link href={`/home/${item.home.id}`}>
                <h3 className="font-medium text-sm">
                  {item.home.town && item.home.region
                    ? `${format(item.home.town)} / ${format(item.home.region)}, Cameroon`
                    : "Location not set"}
                </h3>
                <p className="text-muted-foreground text-xs line-clamp-2 mt-1">
                  {item.home.description}
                </p>
                <p className="mt-1 text-sm">
                  <span className="font-semibold">{item.home.price?.toLocaleString()}</span>{" "}
                  FCFA / Night
                </p>
              </Link>

              {/* Action buttons — only shown when not cancelled */}
              {!isCancelled && (
                <div className="flex flex-col gap-2 mt-1">
                  {/* Pay button — only shown when not yet paid */}
                  {!isPaid && (
                    <PayButton
                      homeId={item.home.id}
                      price={item.home.price ?? 0}
                      userId={userId}
                    />
                  )}

                  {/* Cancel button */}
                  <form action={cancelReservation}>
                    <input type="hidden" name="reservationId" value={item.id} />
                    <input type="hidden" name="userId" value={userId} />
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Cancel Reservation
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}