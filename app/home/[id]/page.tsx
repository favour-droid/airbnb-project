/* eslint-disable @next/next/no-img-element */

import { getRegionByValue, getTownByValue } from "@/app/lib/cameroon";
import  prisma from "@/app/lib/db";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { CategoryShowcase   } from '../../components/CategoryShowcase';
import { HomeMap } from "@/app/components/HomeMap";
import { SelectCalender } from "@/app/components/SelectCalender";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createReservation } from "@/app/actions";
import { ReservationSubmitButton } from "@/app/components/submitbuttons";
async function getData(homeid: string) {
    const data = await prisma.home.findUnique({
        where: {
            id: homeid,
        },
        select: {
            photo: true,
            description: true,
            guests: true,
            bedrooms: true,
            bathrooms: true,
            price: true,
            title: true,
            categoryName: true,
            region: true,
            town: true,
            Reservation: {
                where: {
                    homeId: homeid,
                } 
                },
                



            User: {
                select: {
                    profileImage: true,
                    firstName: true,
                },
            },
        },
    });

    return data;
}

export default async function HomeRoute({params}: {params: {id: string}}) {
    const data = await getData (params.id);

     // ✅ Prevent crash if no data
  if (!data) {
    return <div className="text-center mt-10">No home found</div>;
  }
    const region = getRegionByValue(data.region || "");
    const town = getTownByValue(data.town || "");
    const {getUser} = getKindeServerSession();
    const user = await getUser();   
    
return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
        <h1  className="font-medium text-2xl mb-5">{data?.title}</h1>
        <div className="relative h-[550px]">
            <Image 
            alt="Image of home" 
            src={`https://bjkfbtygdoawiobrjzyd.supabase.co/storage/v1/object/public/images/${data?.photo}`} 
            fill
            className="rounded-lg h-full object-cover w-full"
            />
        </div>
        <div className="flex justify-between gap-x-24 mt-8">
<div className="w-2/3">
<h3 className="text-xl font-medium">
    {region?.label || "Unknown Region"} /{" "}
            {town?.label || "Unknown Town"}
</h3>
<div className="flex gap-x-2 text-muted-foreground">
    <p>{data?.guests} guests</p>*
    <p>{data?.bedrooms} bedrooms</p>*
    <p>{data?.bathrooms} bathrooms</p>
</div>

<div className="flex items-center mt-6">
<img src={data?.User?.profileImage ?? 
'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} 
alt="User Profile" 
className="w-11 h-11 rounded-full"
 />
<div className="flex flex-col ml-4">
    <h3 className="font-medium">Hosted by {data?.User?.firstName || "Unknown User"}</h3>
    <p className="text-sm text-muted-foreground"> Host since 2025 </p>

</div>
</div>

<Separator className="my-7"/>

<CategoryShowcase categoryName={data?.categoryName as string} />
<Separator className="my-7"/>
<p className="text-muted-foreground">{data?.description}</p>

<Separator className="my-7"/>
 {/* <HomeMap locationValue={`${data?.region}, ${data?.town}`} />  */}


<HomeMap locationValue={data?.town ?? ""} />


</div>
<form action={createReservation}>
    <input type="hidden" name="homeId" value={params.id} />
    <input type="hidden" name="userId" value={user?.id} />


<SelectCalender reservation={data?.Reservation} />

{user?.id ? (
   <ReservationSubmitButton />
) : (
 

<Button className="w-full" asChild>
    <Link href="/api/auth/login">Make a Reservation</Link>
</Button>
)}
</form>

        </div>

    </div>
);
}