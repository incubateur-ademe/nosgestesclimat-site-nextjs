'use client'

import Trans from '@/components/translation/Trans'
import { PropsWithChildren } from 'react'

export default function OpenSourceBlock({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-4 pt-10 md:px-8">
      <h2>
        <Trans>Ouvert, documenté et contributif</Trans>
      </h2>
      {children}
    </div>
  )
}
