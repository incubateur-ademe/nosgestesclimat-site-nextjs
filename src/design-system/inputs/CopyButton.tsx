'use client'

import ToastDisplay from '@/components/messages/ToastDisplay'
import Trans from '@/components/translation/Trans'
import { displayErrorToast } from '@/helpers/toasts/displayErrorToast'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { PropsWithChildren, ReactNode } from 'react'
import { useState } from 'react'
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

  const { t } = useClientTranslation()

  return (
    <>
      <Button
        color="text"
        className={`w-full ${className}`}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(textToCopy)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 3000)
          } catch (err) {
            // Do not use the injection method of t here as it injects an encoded link
            displayErrorToast(
              `${t(
                'Oups, une erreur est survenue lors de la copie du lien, voici le lien à copier / coller :'
              )} ${textToCopy}`
            )
          }
        }}>
        {isCopied
          ? (copiedStateText ?? <Trans locale={locale}>Copié !</Trans>)
          : (children ?? <Trans locale={locale}>Copier le lien</Trans>)}
      </Button>

      <ToastDisplay />
    </>
  )
}
