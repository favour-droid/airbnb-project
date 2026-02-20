"use client";

// import { useCountries } from "@/app/lib/getCountries";
import { Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectLabel, 
    SelectTrigger, 
    SelectValue } from "@/components/ui/select";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { CreationButtomBar } from "@/app/components/CreationButtomBar";
import { CreateLocation } from "@/app/actions";
import { useState } from "react";
import React from "react";
import { useCameroon } from "@/app/hooks/useCameroon";


export default function AddressRout({params}: {params: Promise<{id: string}>}) {
    // const {getAllCountries} = useCountries();


  const { getAllRegions, getRegionByValue } = useCameroon();

  const [region, setRegion] = useState("");
  const [town, setTown] = useState("");

  const regions = getAllRegions();
  const towns = region ? getRegionByValue(region)?.towns ?? [] : [];


const [locationValue, setLocationValue] = useState("")
    const LazyMap = dynamic(() => import("@/app/components/Map"), {
      ssr: false,
      loading: () => <Skeleton  className="h-[50vh] w-full"/>,
    });
     const { id } = React.use(params);
    return (
        <>
        <div className="w-3/5 mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
                Where is your Home located?
            </h2>
        </div>
 
        <form action={ CreateLocation}>
            {/* <input type="hidden" name="homeId" value={id} />
             <input type="hidden" name="countryValue" value={locationValue} /> */}

                  {/* HOME ID */}
        <input type="hidden" name="homeId" value={id} />

        {/* REGION */}
        <input type="hidden" name="region" value={region} />

        {/* TOWN (used by Map + DB) */}
        <input type="hidden" name="town" value={town} />
              

              <div className="w-3/5 mx-auto mb-36">
              <div className="mb-5">

                {/* <Select required onValueChange={(value) => setLocationValue(value)}> */}

                 <Select required onValueChange={(value) => {
            setRegion(value);
            setTown("");
          }}>

                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Region (Cameroon)" />

                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {/* <SelectLabel>Countries</SelectLabel>
                        {getAllCountries().map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.flag} {item.label} / {item.region}

                            </SelectItem>
                        ))} */}

                      
                        <SelectLabel>Regions</SelectLabel>
                {regions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}

                    </SelectGroup>
                </SelectContent>

                </Select>

                  {/* TOWN SELECT */}
          <Select
            required
            disabled={!region}
            onValueChange={(value) => setTown(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Town" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Towns</SelectLabel>
                {towns.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

              </div>
              <LazyMap locationValue={locationValue} />
              </div>
<CreationButtomBar/>
        </form>
        </>
    );

}