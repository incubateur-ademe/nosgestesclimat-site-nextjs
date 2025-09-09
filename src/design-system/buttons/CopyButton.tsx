'use client'

import Trans from '@/components/translation/trans/TransClient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { captureException } from '@sentry/nextjs'
import isMobile from 'is-mobile'
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
  canShare?: boolean
  shareTitle?: string
}

export default function CopyButton({
  children,
  color = 'text',
  textToCopy,
  className = '',
  copiedStateText,
  onCopied,
  canShare = true,
  shareTitle,
}: PropsWithChildren<Props>) {
  const { t } = useClientTranslation()
  const [isCopied, setIsCopied] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout>(undefined)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const isShareDefined =
    typeof navigator !== 'undefined' && navigator.share !== undefined

  const handleShareOrCopy = async () => {
    setIsLoading(true)
    setIsError(false)

    // For mobile devices with native sharing
    if (canShare && navigator?.share && isMobile()) {
      try {
        await navigator.share({
          url: textToCopy,
          title:
            shareTitle ||
            t('copyButton.shareTitle', 'Découvre mon empreinte carbone !'),
        })
        return
      } catch (err) {
        captureException(err)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    // For desktop devices or fallback
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(textToCopy)
        setIsCopied(true)
        onCopied?.()
        timeoutRef.current = setTimeout(() => setIsCopied(false), 3000)

        // Focus on button after copy for accessibility
        setTimeout(() => {
          buttonRef.current?.focus()
        }, 100)
      } catch (err) {
        captureException(err)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const getButtonText = () => {
    if (isLoading) {
      return <Trans>Partage en cours...</Trans>
    }
    if (isCopied) {
      return (
        copiedStateText ?? (
          <span className="text-green-700">
            <Trans>Copié !</Trans>
          </span>
        )
      )
    }
    return children ?? <Trans>Copier le lien</Trans>
  }

  const getButtonAriaLabel = () => {
    if (isLoading) {
      return t('copyButton.loadingAriaLabel', 'Partage en cours...')
    }
    if (isCopied) {
      return t(
        'copyButton.copiedAriaLabel',
        'Lien copié dans le presse-papiers'
      )
    }
    if (canShare && isShareDefined && isMobile()) {
      return t('copyButton.shareAriaLabel', 'Partager le lien')
    }
    return t(
      'copyButton.copyAriaLabel',
      'Copier le lien dans le presse-papiers'
    )
  }

  return (
    <>
      <Button
        ref={buttonRef}
        color={color}
        className={twMerge('w-full', className)}
        onClick={handleShareOrCopy}
        disabled={isLoading}
        aria-label={getButtonAriaLabel()}
        aria-live="polite"
        aria-busy={isLoading}>
        {getButtonText()}
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
