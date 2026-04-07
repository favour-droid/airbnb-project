
// import Image from "next/image";
// import Link from "next/link";
// import { AddToFavoriteButton, DeleteFromFavoriteButton} from "./submitbuttons";
// import { addToFavorite, deleteFromFavoriteButton } from "../actions";
// // import { useCountries } from '../lib/getCountries';

// interface iAppProps {
//     imagePath:string;
//     description: string;
//     // location: string;
//     town?: string;
//     region?: string;
//     price: number;
//     userId: string | undefined;
//     isInFavorite?: boolean;
//     favoriteId?: string;
//     homeId?: string;
//     pathName: string;
// }

// export function ListingCard({ description, 
//     imagePath, 
//     town, 
//     region, 
//     price, 
//     userId, 
//     isInFavorite, 
//     favoriteId, 
//     homeId, 
//     pathName,
// }: iAppProps) {
// // const {getCountryByValue} =useCountries();
// // const country = getCountryByValue(location);

//   const format = (text?: string) =>
//     text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

//     return (
//         <div className="flex flex-col">
//             <div className="relative h-72">
//                 <Image src={`https://bjkfbtygdoawiobrjzyd.supabase.co/storage/v1/object/public/images/${imagePath}`}
//                 alt="Image of House" 
//                 fill 
//                 className="rounded-lg h-full object-cover"
//                 />
            
//  {userId && (
//     <div className="z-10 absolute top-2 right-2">
//        {isInFavorite ? (
//        <form action={deleteFromFavoriteButton}>
//         <input type="hidden" name="favoriteId" value={favoriteId} />
//             <input type="hidden" name="userId" value={userId} />
//             <input type="hidden" name="pathName" value={pathName} />
//        <DeleteFromFavoriteButton />
//        </form>
//          ) : (
//         <form action={addToFavorite}>
//             <input type="hidden" name="homeId" value={homeId} />
//             <input type="hidden" name="userId" value={userId} />
//             <input type="hidden" name="pathName" value={pathName} />
//         <AddToFavoriteButton />
//         </form>
//             )}

//     </div>
// )}
//             </div>
//             <Link href={`/home/${homeId}`} className="mt-2">
//             <h3 className="font-medium text-base">
//                 {/* {country?.flag} {country?.label} / {country?.region} */}
//                  {town && region
//             ? `${format(town)} / ${format(region)}, Cameroon`
//             : "Location not set"}
//             </h3>
//             <p className="text-muted-foreground text-sm line-clamp-2">
//                 {description}
//                 </p>
//                 <p className="pt-2 text-muted-foreground">
//                     <span className="font-medium text-black">{price}</span> FCFA / Night
//                 </p>
//             </Link>
//         </div>
//     )
// }

"use client";
// components/ListingCards.tsx
import Image from "next/image";
import Link from "next/link";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./submitbuttons";
import { addToFavorite, deleteFromFavoriteButton } from "../actions";

interface iAppProps {
  imagePath: string;
  description: string;
  town?: string;
  region?: string;
  price: number;
  userId: string | undefined;
  isInFavorite?: boolean;
  favoriteId?: string;
  homeId?: string;
  pathName: string;
  onPay?: (homeId: string, amount: number) => void;
}

export function ListingCard({
  description,
  imagePath,
  town,
  region,
  price,
  userId,
  isInFavorite,
  favoriteId,
  homeId,
  pathName,
  onPay,
}: iAppProps) {
  const format = (text?: string) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://bjkfbtygdoawiobrjzyd.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of House"
          fill
          className="rounded-lg h-full object-cover"
        />

        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavorite ? (
              <form action={deleteFromFavoriteButton}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
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

      <Link href={`/home/${homeId}`} className="mt-2">
        <h3 className="font-medium text-base">
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

      {onPay && (
        <button
          onClick={() => onPay(homeId!, price)}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          Pay Now
        </button>
      )}
    </div>
  );
}

