import { PARTNER_URL } from '@/constants/urls/main'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'

export function useVerifyPartner(partner?: string): boolean {
  const { data, mutate } = useMutation({
    mutationFn: async () => {
      if (!partner) return false

      try {
        // If request is successful, the partner is verified
        await axios.get(`${PARTNER_URL}/${partner}`)
        return true
      } catch (err) {
        return false
      }
    },
  })

  useEffect(() => {
    mutate()
  }, [])

  return data ?? false
}
