'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Redirect404() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/404')
  }, [router])

  return null
}
