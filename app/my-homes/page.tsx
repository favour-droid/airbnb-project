import prisma from '@/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { NoItems } from '../components/NoItems';
import { ListingCard} from '../components/ListingCards';

async function getData(userId: string) {
const data = await prisma.home.findMany({
    where: {
        userId: userId,
        addedCategory: true,
        addedDescription: true,
        addedLocation: true,
    },
    select: {
        id: true,
        town: true,
        region: true,
        photo: true,
        description: true,
        price: true,
        Favorite: true,
    },
    orderBy: {
        createdAt: 'desc',
    },
});
return data;

}
export default async function MyHomes() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return redirect("/");
    }
    const data =await getData(user.id);
    return (
        <section className="container mx-auto px-5 lg:px-10 mt-10">
            <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
 
          {data.length === 0 ? (
            <NoItems description="Pleease list a home on favstay so that you can see it right her" title= "You don't have any homes listed" />
            ) : (
               <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
                    {data.map((item) => (
                        <ListingCard
                        key={item.id} 
                        imagePath={item.photo as string} 
                        homeId={item.id} 
                        price={item.price as number}
                        description={item.description as string}
                         town={item.town as string}
                         region={item.region as string}
                         userId={user.id}
                         pathName="/my-homes"
                         favoriteId={item.Favorite[0]?.id}
                            isInFavorite={item.Favorite.length > 0 ? true : false}   
                            />
                    ))}
               </div>

               )}
        </section>
    );
}