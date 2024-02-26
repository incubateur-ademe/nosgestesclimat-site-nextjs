import { GROUP_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useMemo } from 'react'

export function useFetchGroupsOfUser() {
  const { user, simulations } = useUser()

  const groupIds = useMemo(
    () =>
      simulations
        .filter((simulation) => simulation.group)
        .map((simulation) => simulation.group),
    [simulations]
  )

  return useQuery({
    queryKey: ['groups', user.userId, groupIds],
    queryFn: () =>
      axios
        .post(`${GROUP_URL}/fetch-groups`, {
          userId: user.userId,
          groupIds,
        })
        .then((response) => {
          return response.data
        }),
    enabled: groupIds.length > 0,
    initialData: [],
  })
}
