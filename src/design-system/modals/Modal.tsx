'use client'

import CloseIcon from '@/components/icons/Close'
import Trans from '@/components/translation/trans/TransClient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { twMerge } from 'tailwind-merge'
import Button from '../buttons/Button'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalComponent = ReactModal as any

// Set the app element once when the module is loaded
if (typeof document !== 'undefined') {
  ReactModal.setAppElement(document.body)
}

type Props = {
  closeModal: () => void
  children: ReactNode
  isLoading?: boolean
  isOpen: boolean
  hasAbortCross?: boolean
  hasAbortButton?: boolean
  buttons?: ReactNode
  className?: string
  ariaLabel?: string
  ariaLabelledBy?: string
}

export default function Modal({
  closeModal,
  children,
  isLoading,
  isOpen,
  hasAbortCross = true,
  hasAbortButton = true,
  buttons,
  className,
  ariaLabel,
  ariaLabelledBy,
  ...props
}: Props) {
  const [isVisible, setIsVisible] = useState(false)

  const { t } = useClientTranslation()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
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
    <ModalComponent
      aria={{
        label: ariaLabel,
        labelledby: ariaLabelledBy,
      }}
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
      {...props}>
      {hasAbortCross && (
        <div className="absolute -top-1 right-0 flex justify-end leading-none">
          <button
            className="focus:ring-primary-700 p-4 leading-none focus:ring-2 focus:ring-offset-3 focus:outline-hidden"
            disabled={isLoading}
            data-testid="modal-close-button"
            onClick={!isLoading ? closeDelayed : () => {}}
            title={t('Fermer')}>
            <CloseIcon className="w-4" />
          </button>
        </div>
      )}

      <div>{children}</div>

      {hasAbortButton || buttons ? (
        <div className="mt-12 flex flex-col-reverse justify-between gap-2 sm:flex-row">
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
    </ModalComponent>
  )
}
