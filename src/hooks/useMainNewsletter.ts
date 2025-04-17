import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { LIST_MAIN_NEWSLETTER } from '../constants/brevo'
import { NEWSLETTER_URL } from '../constants/urls/main'

export type Newsletter = {
  id: number
  name: string
  totalSubscribers: number
}

export function useMainNewsletter() {
  return useQuery({
    queryKey: ['mainNewsletter'],
    queryFn: () =>
      axios
        .get<Newsletter>(`${NEWSLETTER_URL}/${LIST_MAIN_NEWSLETTER}`)
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  })
}
