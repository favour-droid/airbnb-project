import { cameroonRegions } from "@/app/lib/cameroon"

export function useCameroon() {
  const getAllRegions = () => cameroonRegions

  const getRegionByValue = (value: string) =>
    cameroonRegions.find((r) => r.value === value)

  const getTownByValue = (townValue: string) => {
    for (const region of cameroonRegions) {
      const town = region.towns.find((t) => t.value === townValue)
      if (town) return town
    }
  }

  return {
    getAllRegions,
    getRegionByValue,
    getTownByValue,
  }
}
