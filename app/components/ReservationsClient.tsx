"use client";
import { ListingCard } from "./ListingCards";

interface HomeData {
  id: string;
  home: {
    id: string;
    region: string;
    town: string;
    description: string;
    photo: string;
    price: number;
    Favorite: { id: string }[];
  };
}

interface ReservationsClientProps {
  data: HomeData[];
  userId: string;
}

export function ReservationsClient({ data, userId }: ReservationsClientProps) {
  // Stripe payment function
  const onPay = async (homeId: string, amount: number) => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ homeId, price: amount, userId }),
      });
      const { url } = await res.json();
      window.location.href = url;
    } catch (error) {
      console.error("Stripe checkout error", error);
    }
  };

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
      {data.map((item) => (
        <ListingCard
          key={item.id}
          description={item.home.description}
          region={item.home.region}
          town={item.home.town}
          pathName="/reservations"
          homeId={item.home.id}
          imagePath={item.home.photo}
          price={item.home.price}
          userId={userId}
          favoriteId={item.home.Favorite[0]?.id}
          isInFavorite={item.home.Favorite.length > 0}
          onPay={onPay} // <-- safe here
        />
      ))}
    </div>
  );
}