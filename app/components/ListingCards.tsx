
import Image from "next/image";
import Link from "next/link";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./submitbuttons";
import { addToFavorite } from "../actions";
// import { useCountries } from '../lib/getCountries';

interface iAppProps {
    imagePath:string;
    description: string;
    // location: string;
    town?: string;
    region?: string;
    price: number;
    userId: string | undefined;
    isInFavorite?: boolean;
    favoriteId?: string;
    homeId?: string;
    pathName: string;
}

export function ListingCard({ description, 
    imagePath, 
    town, 
    region, 
    price, 
    userId, 
    isInFavorite, 
    favoriteId, 
    homeId, 
    pathName,
}: iAppProps) {
// const {getCountryByValue} =useCountries();
// const country = getCountryByValue(location);

  const format = (text?: string) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

    return (
        <div className="flex flex-col">
            <div className="relative h-72">
                <Image src={`https://bjkfbtygdoawiobrjzyd.supabase.co/storage/v1/object/public/images/${imagePath}`}
                alt="Image of House" 
                fill 
                className="rounded-lg h-full object-cover"
                />
            
 {userId && (
    <div className="z-10 absolute top-2 right-2">
       {isInFavorite ? (
       <form>
       <DeleteFromFavoriteButton />
       </form>
         ) : (
        <form action={addToFavorite}>
            <input type="hidden" name="homeId" value={homeId} />
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="pathName" value={pathName} />
        <AddToFavoriteButton />
        </form>
            )}

    </div>
)}
            </div>
            <Link href={"/"} className="mt-2">
            <h3 className="font-medium text-base">
                {/* {country?.flag} {country?.label} / {country?.region} */}
                 {town && region
            ? `${format(town)} / ${format(region)}, Cameroon`
            : "Location not set"}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
                {description}
                </p>
                <p className="pt-2 text-muted-foreground">
                    <span className="font-medium text-black">{price}</span> FCFA / Night
                </p>
            </Link>
        </div>
    )
}