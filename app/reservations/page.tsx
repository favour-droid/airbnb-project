// import { ListingCard } from "../components/ListingCards";
// import prisma from "../lib/db"
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { NoItems } from "../components/NoItems";
//    import { redirect } from "next/navigation";

// async function getData (userId: string) {
//     const data = await prisma.reservation.findMany({
//         where: {
//             userId: userId,
//         },
//         select: {
//           id: true,
//             home: {
//                 select: {
//                 id: true,
//                 region: true,
//                 town: true,
//                 description: true,
//                 photo: true,
//                 price: true,
//                 Favorite: {
//                     where: {
//                         userId: userId,
//                },
//             },
//         },
//        },
//         },
//     });

// return data;
// }

// export default async function ReservationsRoute() {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();
//   if (!user?.id) return redirect("/");
//   const data = await getData(user.id);
  
//   return (
//     <section className="container mx-auto px-5 lg:px-10 mt-10">
//       <h2 className="text-3xl font-semibold tracking-tight">
//         Your Reservations
//       </h2>

//       {data.length === 0 ? (
//         <NoItems
//           title="Hey you dont have any Reservations"
//           description="Please add a reservation to see it right here..."
//         />
//       ) : (
//         <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
//           {data.map((item) => (
//             <ListingCard
//               key={item.id}
//               description={item.home?.description as string}
//               region={item.home?.region as string}
//               town={item.home?.town as string}
//               pathName="/reservations"
//               homeId={item.home?.id as string}
//               imagePath={item.home?.photo as string}
//               price={item.home?.price as number}
//               userId={user.id}
//               favoriteId={item.home?.Favorite[0]?.id as string}
//               isInFavorite={
//                 (item.home?.Favorite.length as number) > 0 ? true : false
//               }
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }



// app/reservations/page.tsx
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NoItems } from "../components/NoItems";
import { redirect } from "next/navigation";
import { ReservationsClient } from "../components/ReservationsClient";

async function getData(userId: string) {
  const data = await prisma.reservation.findMany({
    where: { userId },
    select: {
      id: true,
      home: {
        select: {
          id: true,
          region: true,
          town: true,
          description: true,
          photo: true,
          price: true,
          Favorite: {
            where: { userId },
          },
        },
      },
    },
  });

  return data;
}

export default async function ReservationsRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id) return redirect("/");

  const data = await getData(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>

      {data.length === 0 ? (
        <NoItems
          title="Hey you don’t have any Reservations"
          description="Please add a reservation to see it right here..."
        />
      ) : (
        <ReservationsClient data={data} userId={user.id} />
      )}
    </section>
  );
}