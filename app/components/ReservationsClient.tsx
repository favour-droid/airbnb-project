"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cancelReservation } from "../actions";
import { MobileMoneyModal } from "./MobileMoneyModal";

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

export function ReservationsClient({ data, userId }: Props) {
  const router = useRouter();
  const format = (text?: string | null) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
      {data.map((item) => (
        <ReservationCard
          key={item.id}
          item={item}
          userId={userId}
          format={format}
          onMutate={() => router.refresh()}
        />
      ))}
    </div>
  );
}

function ReservationCard({
  item,
  userId,
  format,
  onMutate,
}: {
  item: HomeData;
  userId: string;
  format: (t?: string | null) => string;
  onMutate: () => void;
}) {
  const [showPayModal, setShowPayModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const isPaid = item.paymentStatus === "paid";

  async function handleCancel() {
    setCancelling(true);
    const fd = new FormData();
    fd.append("reservationId", item.id);
    fd.append("userId", userId);
    await cancelReservation(fd);
    onMutate();
  }

  return (
    <>
      {showPayModal && (
        <MobileMoneyModal
          homeId={item.home.id}
          price={item.home.price ?? 0}
          userId={userId}
          onClose={() => setShowPayModal(false)}
          onSuccess={() => {
            setShowPayModal(false);
            onMutate();
          }}
        />
      )}

      <div className="flex flex-col rounded-lg border overflow-hidden">
        {/* Listing image — NO status badge */}
        <div className="relative h-56">
          <Image
            src={`https://bjkfbtygdoawiobrjzyd.supabase.co/storage/v1/object/public/images/${item.home.photo}`}
            alt="Home"
            fill
            className="object-cover"
          />
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
              <span className="font-semibold">
                {item.home.price?.toLocaleString()}
              </span>{" "}
              FCFA / Night
            </p>
          </Link>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 mt-1">
            {isPaid ? (
              // Paid: show only View Home button
              <Button className="w-full" asChild>
                <Link href={`/home/${item.home.id}`}>View Home</Link>
              </Button>
            ) : (
              // Not paid: show Pay Now button
              <Button
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                onClick={() => setShowPayModal(true)}
              >
                💳 Pay Now
              </Button>
            )}

            {/* Cancel button — always visible */}
            <Button
              onClick={handleCancel}
              disabled={cancelling}
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50"
            >
              {cancelling ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Cancel Reservation"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}