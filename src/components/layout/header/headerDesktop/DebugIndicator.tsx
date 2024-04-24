'use client'

import { useDebug } from '@/hooks/useDebug'
import { useRouter } from 'next/navigation'

export default function DebugIndicator() {
  const isDebug = useDebug()
  const router = useRouter()
  if (!isDebug) return null
  return (
    <button
      className="flex items-center gap-2 rounded-xl bg-red-600 p-2 text-center text-sm font-bold uppercase text-white "
      onClick={() => {
        sessionStorage.removeItem('debug')
        router.refresh()
      }}>
      Debug
    </button>
  )
}
