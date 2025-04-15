'use client'

import Trans from '@/components/translation/trans/TransClient'
import { displayErrorToast } from '@/helpers/toasts/displayErrorToast'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { PropsWithChildren, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button, { type ButtonProps } from './Button'

type Props = {
  color?: ButtonProps['color']
  textToCopy: string
  className?: string
  copiedStateText?: ReactNode
}

export default function CopyButton({
  children,
  color = 'text',
  textToCopy,
  className = '',
  copiedStateText,
}: PropsWithChildren<Props>) {
  const [isCopied, setIsCopied] = useState(false)

  const { t } = useClientTranslation()

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

            timeoutRef.current = setTimeout(() => setIsCopied(false), 3000)
          } catch (err) {
            displayErrorToast(
              `${t(
                'Oups, une erreur est survenue lors de la copie du lien, voici le lien à copier / coller :'
              )} ${textToCopy}`
            )
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
    </>
  )
}
