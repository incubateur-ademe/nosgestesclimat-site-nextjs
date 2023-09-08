'use client'

import { PropsWithChildren } from 'react'

/**
 * Used to wrap server components added into client components
 * @returns
 */
export default function ClientContainer({ children }: PropsWithChildren) {
  return <>{children}</>
}
