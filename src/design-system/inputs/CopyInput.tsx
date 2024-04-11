'use client'

import Trans from '@/components/translation/Trans'
import { useState } from 'react'
import Button from './Button'

type Props = {
  textToCopy: string
  textToDisplay?: string
  className?: string
  onClick?: () => void
}

export default function CopyInput({
  textToCopy,
  textToDisplay,
  className = '',
  onClick,
}: Props) {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <div className={`flex ${className}`}>
      <input
        type="text"
        className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border border-r-0 border-solid border-gray-200 bg-gray-100 py-3 pl-4 pr-2 text-gray-600 sm:text-sm"
        value={textToDisplay ?? textToCopy}
        readOnly
      />
      <Button
        size="sm"
        className="!min-w-[9rem] flex-shrink-0 justify-center rounded-l-none px-4 py-2"
        onClick={() => {
          navigator.clipboard.writeText(textToCopy)
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 3000)

          if (onClick) onClick()
        }}>
        {isCopied ? <Trans>Copié !</Trans> : <Trans>Copier le lien</Trans>}
      </Button>
    </div>
  )
}
