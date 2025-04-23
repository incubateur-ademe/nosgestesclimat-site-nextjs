'use client'

import CloseIcon from '@/components/icons/Close'
import Trans from '@/components/translation/trans/TransClient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { twMerge } from 'tailwind-merge'
import Button from '../buttons/Button'

type Props = {
  closeModal: () => void
  children: ReactNode
  isLoading?: boolean
  isOpen: boolean
  hasAbortCross?: boolean
  hasAbortButton?: boolean
  buttons?: ReactNode
  ariaHideApp?: boolean
  className?: string
}

export default function Modal({
  closeModal,
  children,
  isLoading,
  isOpen,
  hasAbortCross = true,
  hasAbortButton = true,
  buttons,
  ariaHideApp,
  className,
  ...props
}: Props) {
  const [isVisible, setIsVisible] = useState(false)

  const { t } = useClientTranslation()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    ReactModal.setAppElement('#modal')

    if (isOpen) {
      requestAnimationFrame(() => setIsVisible(true))
    }

    return () => {
      document.body.style.overflow = 'auto'
      setIsVisible(false)
    }
  }, [isOpen])

  const closeDelayed = () => {
    setIsVisible(false)
    setTimeout(() => closeModal(), 500)
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={!isLoading ? closeDelayed : undefined}
      className={twMerge(
        'fixed bottom-0 left-1/2 w-[40rem] max-w-[90vw] -translate-x-1/2 rounded-t-xl bg-white p-6 pt-10 transition-all duration-300 ease-out md:top-1/2 md:bottom-auto',
        isVisible
          ? 'translate-y-0 opacity-100 md:-translate-y-1/2 md:rounded-xl'
          : 'translate-y-12 opacity-0 md:-translate-y-[calc(50%-3rem)]',
        className
      )}
      overlayClassName={twMerge(
        'fixed top-0 left-0 right-0 bottom-0 bg-black/50 duration-500 z-10000 overflow-hidden transition-opacity',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      ariaHideApp={ariaHideApp}
      {...props}>
      {hasAbortCross && (
        <div className="absolute -top-1 right-0 flex justify-end leading-none">
          <button
            className="p-4 leading-none"
            disabled={isLoading}
            onClick={!isLoading ? closeDelayed : () => {}}
            title={t('Fermer')}>
            <CloseIcon className="w-4" />
          </button>
        </div>
      )}

      <div>{children}</div>

      {hasAbortButton || buttons ? (
        <div className="mt-12 flex justify-between">
          {hasAbortButton && (
            <Button
              color="secondary"
              disabled={isLoading}
              onClick={!isLoading ? closeDelayed : () => {}}>
              <Trans>Annuler</Trans>
            </Button>
          )}
          {buttons ? buttons : null}
        </div>
      ) : null}
    </ReactModal>
  )
}
