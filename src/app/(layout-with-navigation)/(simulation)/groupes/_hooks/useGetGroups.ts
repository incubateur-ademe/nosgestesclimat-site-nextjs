import { GROUP_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useGetGroups(userId: string) {
  return useQuery(['groups'], () =>
    axios.get(`${GROUP_URL}/user-groups/${userId}`).then((response) => {
      return response.data
    })
  )
}
