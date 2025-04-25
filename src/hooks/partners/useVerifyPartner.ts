import { verifyPartner } from '@/services/partners/verifyPartner'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

export function useVerifyPartner(partner?: string): boolean {
  const { data, mutate } = useMutation({
    mutationFn: async () => {
      if (!partner) return false

      return await verifyPartner(partner)
    },
  })

  useEffect(() => {
    mutate()
  }, [mutate])

  return data ?? false
}
