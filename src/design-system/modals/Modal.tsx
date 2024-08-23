import Trans from '@/components/translation/Trans'
import { ReactNode, useEffect } from 'react'
import ReactModal from 'react-modal'
import Button from '../inputs/Button'

type Props = {
  closeModal: () => void
  children: ReactNode
  isLoading?: boolean
  isOpen: boolean
  hasAbortButton?: boolean
  buttons?: ReactNode
}

ReactModal.setAppElement('#modal')

export default function Modal({
  closeModal,
  children,
  isLoading,
  isOpen,
  hasAbortButton = true,
  buttons,
}: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <ReactModal
      isOpen={isOpen}
      className="fixed left-1/2 w-[40rem] max-w-full -translate-x-1/2 bg-white p-8 pt-16 md:top-1/2 md:-translate-y-1/2 md:rounded-xl md:pt-8"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-[10000] overflow-hidden">
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
