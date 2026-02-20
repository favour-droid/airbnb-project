"use server";

import  prisma  from "./lib/db";
import { redirect } from "next/navigation";
import { supabase } from "./lib/supabase";
import { cameroonRegions } from "./lib/cameroon";
import { revalidatePath } from "next/cache";

export async function createFavstayHome({userId}: {userId: string}) {
    
    // const data = await prisma.home.findFirst({
    //  where: {
    //     userId: userId,
    //  },
    //  orderBy: {
    //     createdAt: "desc",
    //  },
    // });

    // if(data === null) {
    //     const data = await prisma.home.create({
    //         data: {
    //             userId: userId,
    //         },
    //     });

    //     return redirect(`/create/${data.id}/structure`);


    // } else if (
    //        !data.addedCategory 
    //     && !data.addedDescription 
    //     && !data.addedLocation
    // ) {
    //     const data = await prisma.home.create({
    //         data: {
    //             userId: userId,
    //         },
    //     });
        
    //     return redirect(`/create/${data.id}/structure`);
    // } else if (data.addedCategory && !data.addedDescription) {
    //     return redirect(`/create/${data.id}/description`);
    // } else if(
    //     data.addedCategory && 
    //     data.addedDescription && 
    //     !data.addedLocation){
            
    //     return redirect(`/create/${data.id}/address`);
    //    }   else if(data.addedCategory && data?.addedCategory && data.addedLocation){
    //      return redirect(`/create/${data.id}/structure`);
    //    }

    
  const home = await prisma.home.create({
    data: {
      userId: userId,
    },
  });

  return redirect(`/create/${home.id}/structure`);

    }

export async function createCategoryPage(formData: FormData) {
    const categoryName = formData.get("categoryName") as string;
    const homeId = formData.get("homeId") as string;
    const data = await prisma.home.update({
        where: {
            id: homeId,
        },
        data: {
            categoryName: categoryName,
            addedCategory: true,
        },
    });
 return redirect(`/create/${homeId}/description`);
}
export async function CreateDescription(formData: FormData) {
 
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price");
    const imageFile = formData.get("image") as File;
    const homeId = formData.get("homeId") as string;
    const guestNumber = formData.get("guest") as string;
    const roomNumber = formData.get("room") as string;
    const bathroomsNumber = formData.get("bathroom") as string;

    const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
    cacheControl: "2592000",
    contentType: "image/png"
});

const data = await prisma.home.update({
    where: {
        id: homeId,
    },
    data: {
    title: title,
    description: description,
    price: Number(price),
    bedrooms: roomNumber,
    bathrooms: bathroomsNumber,
    guests: guestNumber,
    photo: imageData?.path,
    addedDescription: true,
    },
});

return redirect(`/create/${homeId}/address`);
}
export async function CreateLocation(formData: FormData) {
//     const homeId = formData.get("homeId") as string;
// const countryValue = formData.get("countryValue") as string;

      const homeId = formData.get("homeId") as string;
  const region = formData.get("region") as string;
  const town = formData.get("town") as string;

    // Find town coordinates
  const townData = cameroonRegions
    .flatMap((r) => r.towns)
    .find((t) => t.value === town);

  if (!townData) {
    throw new Error("Invalid town selected");
  }

//     const data = await prisma.home.update({
//         where: {
//             id: homeId,
//         },
//         data: {
//             addedLocation: true,
//             country: countryValue,
//         },
//     });
//     return redirect("/");


  await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      addedLocation: true,
      region,
      town,
      latitude: townData.lat,
      longitude: townData.lng,
    },
  });

  return redirect("/");
} 
export async function   addToFavorite(formData: FormData) {
const homeId = formData.get("homeId") as string;
const userId = formData.get("userId") as string;
const pathName = formData.get("pathName") as string;

const data = await prisma.favorite.create({
  data: {
    homeId: homeId,
    userId: userId,
  }
});

revalidatePath(pathName);
}