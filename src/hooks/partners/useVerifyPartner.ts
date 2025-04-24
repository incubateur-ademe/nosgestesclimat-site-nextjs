import { PARTNER_URL } from '@/constants/urls/main'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useVerifyPartner(partner?: string) {
  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!partner) return false

      try {
        await axios.get(`${PARTNER_URL}/${partner}`)

        return true
      } catch (err) {
        return false
      }
    },
  })
  return mutate
}
