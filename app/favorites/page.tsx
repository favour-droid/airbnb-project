import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db"
import { redirect } from "next/navigation";
import { ListingCard } from "../components/ListingCards";
async function getData (userId: string) {

   const data = await prisma.favorite.findMany({
    where: {
        userId: userId,
    },
    select:{
        home: {
            select:{
                id: true,
                Favorite: true,
                price: true,
                region: true,
                town: true,
                description: true,
                photo: true,
            },
        },
    },
   }); 
   return data;
}
    export default async function FavoriteRoute() {
        const {getUser} = getKindeServerSession();
        const user = await getUser();
        if(!user) return redirect("/");
        const data = await getData (user.id)
       
        return (
           <section className="container mx-auto py-5 lg:px-10 mt-10">
               <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>
            
            <div className="grid lg:grid-cols-4 sm:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
             {data.map((item) => (
                <ListingCard 
                key={item.home?.id} 
                description={item.home?.description as string} 
                // location={item.home?.region as string} 
                 town={item.home?.town as string}
                region={item.home?.region as string}
                pathName="/favorites"
                homeId={item.home?.id as string}
                imagePath={item.home?.photo as string}
                price={item.home?.price as number}
                userId={user.id}
                favoriteId={item.home?.Favorite[0].id as string}
                isInFavorite={
                (item.home?.Favorite.length as number) > 0 ? true : false } 
              />
             ))}
            </div>
           </section>

        );
    }

