'use client'

import Trans from '@/components/translation/Trans'
import { useEffect, useRef, useState } from 'react'
import Button from './Button'

type Props = {
  textToCopy: string
  textToDisplay?: string
  className?: string
  onClick?: () => void
  canShare?: boolean
}

export default function CopyInput({
  textToCopy,
  textToDisplay,
  className = '',
  onClick,
  canShare,
}: Props) {
  const [isCopied, setIsCopied] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout>()
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const isShareDefined =
    typeof navigator !== 'undefined' && navigator.share !== undefined

  const handleShare = async () => {
    if (navigator.share) {
      await navigator
        .share({
          text: textToCopy,
          url: textToCopy,
          title: 'Découvre mon empreinte carbone !',
        })
        .catch(handleCopy)
    } else {
      handleCopy()
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy)
    setIsCopied(true)
    timeoutRef.current = setTimeout(() => setIsCopied(false), 3000)
  }

  return (
    <div className={`flex ${className}`}>
      <input
        type="text"
        className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-2 border-r-0 border-solid border-gray-200 bg-gray-100 py-3 pl-4 pr-2 text-gray-600 sm:text-sm"
        value={textToDisplay ?? textToCopy}
        readOnly
      />
      <Button
        size="sm"
        className="!min-w-[9rem] flex-shrink-0 justify-center rounded-l-none px-4 py-2"
        onClick={() => {
          if (canShare && isShareDefined) {
            handleShare()
            return
          }
          handleCopy()
          navigator.clipboard.writeText(textToCopy)
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 3000)

          if (onClick) onClick()
        }}>
        {isCopied ? (
          <Trans>Copié !</Trans>
        ) : canShare && isShareDefined ? (
          <Trans>Partager</Trans>
        ) : (
          <Trans>Copier le lien</Trans>
        )}
      </Button>
    </div>
  )
}
