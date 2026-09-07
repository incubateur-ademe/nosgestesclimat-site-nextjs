'use client'

import dynamic from 'next/dynamic'

// Separate client component to avoid SSR and hydration errors
const ClientCircularProgressBar = dynamic(
  () => import('./CircularProgressProut').then((module) => module.default),
  {
    ssr: false,
  }
)

export default ClientCircularProgressBar
