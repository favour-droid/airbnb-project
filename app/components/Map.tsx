"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet"
// import { useCountries } from "../lib/getCountries";
import { icon } from "leaflet";
import { useCameroon } from "../hooks/useCameroon";


const Icon =icon({
    iconUrl: "https://icons.veryicon.com/png/o/miscellaneous/streamline/marker-2-3.png",
    iconSize: [50, 50]
});

export default function Map ({locationValue}: {locationValue: string}) {
// const {getCountryByValue} = useCountries ();
// const latLang =getCountryByValue(locationValue)?.latlng;

 const { getTownByValue } = useCameroon();

  const town = getTownByValue(locationValue);

  // Default = Cameroon center
  const position: [number, number] = town
    ? [town.lat, town.lng]
        : [4.6126, 13.1536];


    return (
    <MapContainer scrollWheelZoom={false} 
    className="h-[50vh] rounded-lg relative z-0" 
    // center={latLang ?? [52.505, -0.09]}
    center={position}
    // zoom={8}
    zoom={town ? 10 : 6}

    >
    
    <TileLayer 
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

    {/* <Marker position={latLang ?? [52.505, -0.09]} icon={Icon} /> */}
    {town &&
     <Marker position={position} icon={Icon} />
     }
    </MapContainer>
    )
}