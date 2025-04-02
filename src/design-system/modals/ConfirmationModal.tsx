'use client'

import Trans from '@/components/translation/trans/TransClient'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import Modal from 'react-modal'
import Button from '../inputs/Button'
import Loader from '../layout/Loader'

type Props = {
  onConfirm: () => void
  closeModal: () => void
  children: ReactNode
  isLoading?: boolean
}

Modal.setAppElement('#modal')

export default function ConfirmationModal({
  onConfirm,
  closeModal,
  children,
  isLoading,
}: Props) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '1rem',
    },
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <Modal
      isOpen
      onRequestClose={closeModal}
      style={customStyles}
      className="fixed top-1/2 left-1/2 w-[40rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-10000 overflow-hidden">
      {children}

      <div className="mt-12 flex flex-wrap justify-center gap-4 md:justify-normal">
        <Button color="secondary" onClick={!isLoading ? closeModal : () => {}}>
          <Trans>Annuler</Trans>
        </Button>

        <Button
          color="primary"
          className="xs:order-2 -order-1 w-[140px]"
          onClick={!isLoading ? onConfirm : () => {}}>
          {isLoading ? <Loader /> : <Trans>Confirmer</Trans>}
        </Button>
      </div>
    </Modal>
  )
}
