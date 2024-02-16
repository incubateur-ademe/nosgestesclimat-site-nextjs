import { useCallback } from 'react'

export function usePollPages() {
  const linkToPollDashboard = useCallback(
    ({ orgaSlug }: { orgaSlug: string }) =>
      `organisations/${orgaSlug}/resultats-detailles`,
    []
  )

  return {
    linkToPollDashboard,
  }
}
