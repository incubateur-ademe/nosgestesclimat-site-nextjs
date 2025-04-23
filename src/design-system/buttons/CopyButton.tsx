'use client'

import Trans from '@/components/translation/trans/TransClient'
import type { PropsWithChildren, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Alert from '../alerts/alert/Alert'
import Button, { type ButtonProps } from './Button'

type Props = {
  color?: ButtonProps['color']
  textToCopy: string
  className?: string
  copiedStateText?: ReactNode
  onCopied?: () => void
}

export default function CopyButton({
  children,
  color = 'text',
  textToCopy,
  className = '',
  copiedStateText,
  onCopied,
}: PropsWithChildren<Props>) {
  const [isCopied, setIsCopied] = useState(false)
  const [isError, setIsError] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout>(undefined)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return (
    <>
      <Button
        color={color}
        className={twMerge('w-full', className)}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(textToCopy)

            setIsCopied(true)

            onCopied?.()

            timeoutRef.current = setTimeout(() => setIsCopied(false), 3000)
          } catch (err) {
            setIsError(true)
          }
        }}>
        {isCopied
          ? (copiedStateText ?? (
              <span className="text-green-700">
                <Trans>Copié !</Trans>
              </span>
            ))
          : (children ?? <Trans>Copier le lien</Trans>)}
      </Button>

      {isError && (
        <Alert
          type="error"
          className="mt-2"
          title={<Trans>Oups, la copie du lien a échoué, le voici :</Trans>}
          description={textToCopy}
        />
      )}
    </>
  )
}
