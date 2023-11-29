'use client'

import { formatResultToDetailParam } from '@/helpers/url/formatResultToDetailParam'
import { useEngine, useForm, useSimulation } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RedirectionIfNoResult({
  details,
}: {
  details: string
}) {
  const { categories } = useSimulation()
  const { progression } = useForm()
  const { getValue } = useEngine()

  const router = useRouter()

  const detailsParamString = formatResultToDetailParam({ categories, getValue })

  useEffect(() => {
    // The URL includes matching results, we assume the user has done the test
    if (!detailsParamString.includes(details) && progression !== 1) {
      router.push(progression > 0 ? '/simulateur/bilan' : '/tutoriel')
    }
  }, [categories, details, progression, router, detailsParamString])

  return null
}
