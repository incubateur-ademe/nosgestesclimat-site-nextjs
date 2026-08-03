'use client'

import CloseIcon from '@/components/icons/Close'
import Trans from '@/components/translation/trans/TransClient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Dialog as DialogPrimitive } from 'radix-ui'
import Button from '../buttons/Button'

interface Props {
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

export const modalClassName =
  'relative mx-auto mt-auto w-[40rem] max-w-[90vw] rounded-t-xl bg-white p-6 pt-10 transition-all duration-300 ease-out md:my-8 md:rounded-xl data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-12 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-12 motion-reduce:animate-none motion-reduce:transition-none'

const overlayClassName =
  'fixed overflow-auto top-0 left-0 right-0 bottom-0 bg-black/50 duration-500 z-10000 transition-opacity flex flex-col data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 motion-reduce:animate-none motion-reduce:transition-none'

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
}: Props) {
  const { t } = useClientTranslation()

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isLoading) {
          closeModal()
        }
      }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={overlayClassName} />

        <DialogPrimitive.Content
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={cn(modalClassName, className)}
          onEscapeKeyDown={(e) => {
            if (isLoading) e.preventDefault()
          }}
          onPointerDownOutside={(e) => {
            if (isLoading) e.preventDefault()
          }}>
          {hasAbortCross && (
            <div className="absolute -top-1 right-0 flex justify-end leading-none">
              <DialogPrimitive.Close asChild>
                <button
                  className="focus:ring-primary-700 p-4 leading-none focus:ring-2 focus:ring-offset-3 focus:outline-hidden"
                  disabled={isLoading}
                  data-testid="modal-close-button"
                  title={t('Fermer')}>
                  <CloseIcon className="w-4" />
                </button>
              </DialogPrimitive.Close>
            </div>
          )}

          <div>{children}</div>

          {hasAbortButton || buttons ? (
            <div className="mt-12 flex flex-col-reverse justify-start gap-2 sm:flex-row md:gap-4">
              {hasAbortButton && (
                <DialogPrimitive.Close asChild>
                  <Button color="secondary" disabled={isLoading}>
                    <Trans>Annuler</Trans>
                  </Button>
                </DialogPrimitive.Close>
              )}
              {buttons ? buttons : null}
            </div>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
