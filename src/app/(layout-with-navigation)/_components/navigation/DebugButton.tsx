'use client'

import { useIsClient } from '@/app/_components/IsClientCtxProvider'
import { useDebug } from '@/hooks/useDebug'
import { usePathname, useRouter } from 'next/navigation'

function setDebugInStorage(value: boolean) {
  sessionStorage.setItem('debug', value === true ? 'true' : 'false')
}

export default function DebugButton() {
  const isDebug = useDebug()
  const router = useRouter()
  const pathname = usePathname()
  const isClient = useIsClient()

  if (!isClient) return null

  const isDebugInStorage = sessionStorage.getItem('debug') != null

  if (!isDebugInStorage) return null

  return (
    <button
      className={`mx-auto hidden rounded-lg bg-red-600 px-4 py-2 text-center font-bold uppercase text-white lg:block ${
        !isDebug ? 'grayscale' : ''
      }`}
      onClick={(event) => {
        event.stopPropagation()
        setDebugInStorage(!isDebug)
        router.push(pathname)
      }}>
      Debug
    </button>
  )
}
