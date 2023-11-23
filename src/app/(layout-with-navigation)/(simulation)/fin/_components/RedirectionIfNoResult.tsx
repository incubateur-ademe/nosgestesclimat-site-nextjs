'use client'

import { formatResultToDetailParam } from '@/helpers/url/formatResultToDetailParam'
import { useEngine, useForm } from '@/publicodes-state'
import { useRouter } from 'next/navigation'

export default function RedirectionIfNoResult({
  details,
}: {
  details: string
}) {
  const { categories, progression } = useForm()
  const { getValue } = useEngine()

  const router = useRouter()

  const detailsParamString = formatResultToDetailParam({ categories, getValue })

  // The URL includes matching results, we assume the user has done the test
  if (detailsParamString.includes(details) || progression === 1) {
    return null
  }

  // Show the tutorial if the user has not done the test
  router.push(progression > 0 ? '/simulateur/bilan' : '/tutoriel')
}
