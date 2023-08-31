'use client'

import TransClient from '@/components/translation/TransClient'
import { useState } from 'react'
import Button from './Button'

type Props = {
  textToCopy: string
  className?: string
}

export default function CopyInput({ textToCopy, className = '' }: Props) {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <div className={`flex ${className}`}>
      <input
        type='text'
        className='block w-full min-w-0 flex-1 rounded-none rounded-l-md border border-r-0 border-solid border-grey-200 bg-grey-100 py-3 pl-4 sm:text-sm'
        value={textToCopy}
        readOnly
      />
      <Button
        color='secondary'
        className='!min-w-[9rem] flex-shrink-0 justify-center rounded-s-none px-4 py-2 text-sm'
        onClick={() => {
          navigator.clipboard.writeText(textToCopy)
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 3000)
        }}
      >
        {isCopied ? (
          <TransClient>Copié !</TransClient>
        ) : (
          <TransClient>Copier le lien</TransClient>
        )}
      </Button>
    </div>
  )
}
