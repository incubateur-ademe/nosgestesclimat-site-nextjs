import { getGeolocation } from '@/helpers/getGeolocation'
import { useUser } from '@/publicodes-state'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useSetInitialRegion = () => {
  const { isInitialized, user, updateInitialRegion, updateRegion } = useUser()

  const { initialRegion, region } = user

  const { data: initialRegionFromGeoloc } = useQuery({
    queryKey: ['geolocation'],
    queryFn: getGeolocation,
    placeholderData: keepPreviousData,
    staleTime: Infinity, // We don't want to fetch the geolocation multiple times
    enabled: isInitialized,
  })

  useEffect(() => {
    // If the initial region is not fetched or if it is the same as the one we already have, we don't do anything
    if (
      !initialRegionFromGeoloc ||
      initialRegionFromGeoloc.code === initialRegion?.code
    ) {
      return
    }

    updateInitialRegion(initialRegionFromGeoloc)

    // If the region is the same as the initial region, we update the region too
    if (initialRegion?.code === region?.code) {
      updateRegion(initialRegionFromGeoloc)
    }
  }, [
    initialRegion,
    region,
    initialRegionFromGeoloc,
    updateInitialRegion,
    updateRegion,
  ])
}
