import { useUser } from '@/publicodes-state'

export function useTrackRegion() {
  const { user } = useUser()

  const { region } = user

  // useEffect(() => {
  //   const regionCode = region?.code || 'FR'
  //   trackPosthogEvent(captureRegion({ region: regionCode }))
  // }, [region])
}
