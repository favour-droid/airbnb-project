export interface Town {
  label: string
  value: string
  lat: number
  lng: number
}

export interface Region {
  label: string
  value: string
  towns: Town[]
}

export const cameroonRegions: Region[] = [
  {
    label: "Littoral",
    value: "littoral",
    towns: [
      { label: "Douala", value: "douala", lat: 4.0511, lng: 9.7679 },
      { label: "Nkongsamba", value: "nkongsamba", lat: 4.9547, lng: 9.9404 },
       { label: "Kribi", value: "kribi", lat: 2.9333, lng: 9.9167 },
    ],
  },
  {
    label: "Centre",
    value: "centre",
    towns: [
      { label: "Yaoundé", value: "yaounde", lat: 3.8480, lng: 11.5021 },
      { label: "Obala", value: "obala", lat: 4.1653, lng: 11.5336 },
    ],
  },
  {
    label: "North West",
    value: "north_west",
    towns: [
      { label: "Bamenda", value: "bamenda", lat: 5.9631, lng: 10.1591 },
      { label: "Kumbo", value: "kumbo", lat: 6.3833, lng: 10.0667 },
    ],
  },
  {
    label: "South West",
    value: "south_west",
    towns: [
      { label: "Buea", value: "buea", lat: 4.1527, lng: 9.2410 },
        { label: "Limbe", value: "limbe", lat: 4.0244, lng: 9.2035 },
         { label: "Kumba", value: "kumba", lat: 4.0242, lng: 9.2149 },
         { label: "Tiko", value: "tiko", lat: 4.0746, lng: 9.3603 },
    ],
  },

  {
    label: "West",
    value: "west",
    towns: [
      { label: "Baffoussam", value: "baffoussam", lat: 3.8480, lng: 11.5021 },
      { label: "Dschang", value: "dschang", lat: 4.1653, lng: 11.5336 },
    ],
  },
  {
    label: "North",
    value: "north",
    towns: [
      { label: "Garoua", value: "garoua", lat: 10.5950, lng: 13.3280 },
      { label: "Lagdo", value: "lagdo", lat: 4.1653, lng: 11.5336 },
    ],
  },
  {
    label: "South",
    value: "south",
    towns: [
      { label: "Ebolowa", value: "ebolowa", lat: 2.9333, lng: 11.0833 },
      { label: "Sangmelima", value: "sangmelima", lat: 4.0500, lng: 14.2500 },
    ],
  },
  {
    label: "Far North",
    value: "far_north",
    towns: [
      { label: "Maroua", value: "maroua", lat: 10.5950, lng: 13.3280 },
      { label: "Kousseri", value: "kousseri", lat: 4.0500, lng: 14.2500 },
    ],
  },
  {
    label: "East",
    value: "east",
    towns: [
      { label: "Bertoua", value: "bertoua", lat: 4.5833, lng: 13.6667 },
      { label: "Yakadouma", value: "yakadouma", lat: 4.1653, lng: 11.5336 },
      { label: "Batouri", value: "batouri", lat: 4.5833, lng: 13.6667 },
    ],
  },
  {
    label: "Adamaoua",
    value: "adamaoua",
    towns: [
      { label: "Ngaoundere", value: "ngaoundere", lat: 10.5950, lng: 13.3280 },
      { label: "Tibati", value: "tibati", lat: 4.1653, lng: 11.5336 },
    ],
  },
]
