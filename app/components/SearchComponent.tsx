// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,} from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,} from "@/components/ui/select";

// import { Search } from "lucide-react";
// import { useState } from "react";
// import { useCountries } from "../lib/getCountries";
// import { HomeMap } from "./HomeMap";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader } from "@/components/ui/card";
// import { Counter } from "./Counter";
// import { CreationSubmit } from "./submitbuttons";

// export function SearchModalComponent() {
//   const [step, setStep] = useState(1);
//   const [locationValue, setLocationValue] = useState("");
//   const { getAllCountries } = useCountries();

//   function SubmitButtonLocal() {
//     if (step === 1) {
//       return (
//         <Button onClick={() => setStep(step + 1)} type="button">
//           Next
//         </Button>
//       );
//     } else if (step === 2) {
//       return <CreationSubmit />;
//     }
//   }
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
//           <div className="flex h-full divide-x font-medium">
//             <p className="px-4">Anywhere</p>
//             <p className="px-4">Any Week</p>
//             <p className="px-4">Add Guests</p>
//           </div>

//           <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
//         </div>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <form className="gap-4 flex flex-col">
//           <input type="hidden" name="country" value={locationValue} />
//           {step === 1 ? (
//             <>
//               <DialogHeader>
//                 <DialogTitle>Select a Country</DialogTitle>
//                 <DialogDescription>
//                   Pleae Choose a Country, so that what you want
//                 </DialogDescription>
//               </DialogHeader>

//               <Select
//                 required
//                 onValueChange={(value) => setLocationValue(value)}
//                 value={locationValue}
//               >
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select a Country" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Countries</SelectLabel>
//                     {getAllCountries().map((item) => (
//                       <SelectItem key={item.value} value={item.value}>
//                         {item.flag} {item.label} / {item.region}
//                       </SelectItem>
//                     ))}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//               <HomeMap locationValue={locationValue} />
//             </>
//           ) : (
//             <>
//               <DialogHeader>
//                 <DialogTitle>Select all the info you need</DialogTitle>
//                 <DialogDescription>
//                   Pleae Choose a Country, so that what you want
//                 </DialogDescription>
//               </DialogHeader>

//               <Card>
//                 <CardHeader className="flex flex-col gap-y-5">
//                   <div className="flex items-center justify-between">
//                     <div className="flex flex-col">
//                       <h3 className="underline font-medium">Guests</h3>
//                       <p className="text-muted-foreground text-sm">
//                         How many guests do you want?
//                       </p>
//                     </div>

//                     <Counter name="guest" />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex flex-col">
//                       <h3 className="underline font-medium">Rooms</h3>
//                       <p className="text-muted-foreground text-sm">
//                         How many rooms do you have?
//                       </p>
//                     </div>

//                     <Counter name="room" />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex flex-col">
//                       <h3 className="underline font-medium">Bathrooms</h3>
//                       <p className="text-muted-foreground text-sm">
//                         How many bathrooms do you have?
//                       </p>
//                     </div>

//                     <Counter name="bathroom" />
//                   </div>
//                 </CardHeader>
//               </Card>
//             </>
//           )}

//           <DialogFooter>
//             <SubmitButtonLocal />
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }


"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { useCameroon } from "../hooks/useCameroon";
import { HomeMap } from "./HomeMap";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "./Counter";

export function SearchModalComponent() {
  const [step, setStep] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const { getAllRegions, getRegionByValue } = useCameroon();

  const regions = getAllRegions();
  const towns = selectedRegion
    ? getRegionByValue(selectedRegion)?.towns ?? []
    : [];

  function SubmitButtonLocal() {
    if (step === 1) {
      return (
        <Button
          onClick={() => setStep(2)}
          type="button"
          disabled={!selectedRegion || !selectedTown}
        >
          Next
        </Button>
      );
    }
    return (
      <Button type="submit">
        Search
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
          <div className="flex h-full divide-x font-medium">
            <p className="px-4">Anywhere</p>
            <p className="px-4">Any Week</p>
            <p className="px-4">Add Guests</p>
          </div>
          <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 flex flex-col">
          <input type="hidden" name="region" value={selectedRegion} />
          <input type="hidden" name="town" value={selectedTown} />

          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a Location</DialogTitle>
                <DialogDescription>
                  Choose a region and town in Cameroon 🇨🇲
                </DialogDescription>
              </DialogHeader>

              {/* Region dropdown */}
              <Select
                onValueChange={(val) => {
                  setSelectedRegion(val);
                  setSelectedTown(""); // reset town when region changes
                }}
                value={selectedRegion}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Regions</SelectLabel>
                    {regions.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Town dropdown — only shows after region is selected */}
              {selectedRegion && (
                <Select onValueChange={setSelectedTown} value={selectedTown}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Town" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        Towns in{" "}
                        {regions.find((r) => r.value === selectedRegion)?.label}
                      </SelectLabel>
                      {towns.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}

              {/* Map preview updates as town is selected */}
              <HomeMap locationValue={selectedTown} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>More Details</DialogTitle>
                <DialogDescription>
                  {towns.find((t) => t.value === selectedTown)?.label},{" "}
                  {regions.find((r) => r.value === selectedRegion)?.label} ·
                  Set your preferences
                </DialogDescription>
              </DialogHeader>

              <Card>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Guests</h3>
                      <p className="text-muted-foreground text-sm">
                        How many guests?
                      </p>
                    </div>
                    <Counter name="guest" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Rooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many rooms?
                      </p>
                    </div>
                    <Counter name="room" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Bathrooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many bathrooms?
                      </p>
                    </div>
                    <Counter name="bathroom" />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}

          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}