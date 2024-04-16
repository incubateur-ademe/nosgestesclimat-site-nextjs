'use client'

import Trans from '@/components/translation/Trans'
import { PropsWithChildren, ReactNode, useState } from 'react'
import Button from './Button'

type Props = {
  textToCopy: string
  className?: string
  copiedStateText?: ReactNode
}

export default function CopyButton({
  children,
  textToCopy,
  className = '',
  copiedStateText,
}: PropsWithChildren<Props>) {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <Button
      color="text"
      className={`w-full ${className}`}
      onClick={() => {
        navigator.clipboard.writeText(textToCopy)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 3000)
      }}
    >
      {isCopied
        ? copiedStateText ?? <Trans>Copié !</Trans>
        : children ?? <Trans>Copier le lien</Trans>}
    </Button>
  )
}
