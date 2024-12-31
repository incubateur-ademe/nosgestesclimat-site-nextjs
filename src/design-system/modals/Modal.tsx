'use client'

import Trans from '@/components/translation/Trans'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import ReactModal from 'react-modal'
import Button from '../inputs/Button'

type Props = {
  closeModal: () => void
  children: ReactNode
  isLoading?: boolean
  isOpen: boolean
  hasAbortCross?: boolean
  hasAbortButton?: boolean
  buttons?: ReactNode
}

ReactModal.setAppElement('#modal')

export default function Modal({
  closeModal,
  children,
  isLoading,
  isOpen,
  hasAbortCross = true,
  hasAbortButton = true,
  buttons,
}: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const { t } = useClientTranslation()

  return (
    <ReactModal
      isOpen={isOpen}
      className="fixed left-1/2 top-1/2 w-[40rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 pt-4"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-[10000] overflow-hidden">
      {hasAbortCross && (
        <div className="flex justify-end">
          <button
            disabled={isLoading}
            onClick={!isLoading ? closeModal : () => {}}
            className="text-xl "
            title={t('Fermer')}>
            ×
          </button>
        </div>
      )}

      {children}

      {hasAbortButton || buttons ? (
        <div className="mt-12 flex justify-between">
          {hasAbortButton && (
            <Button
              color="secondary"
              disabled={isLoading}
              onClick={!isLoading ? closeModal : () => {}}>
              <Trans>Annuler</Trans>
            </Button>
          )}
          {buttons ? buttons : null}
        </div>
      ) : null}
    </ReactModal>
  )
}
