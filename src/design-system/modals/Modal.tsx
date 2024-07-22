import Trans from '@/components/translation/Trans'
import { ReactNode, useEffect } from 'react'
import ReactModal from 'react-modal'
import Button from '../inputs/Button'

type Props = {
  closeModal: () => void
  children: ReactNode
  isLoading?: boolean
}

ReactModal.setAppElement('#modal')

export default function Modal({ closeModal, children, isLoading }: Props) {
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
    <ReactModal
      isOpen
      style={customStyles}
      className="fixed left-1/2 top-1/2 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-[10000] overflow-hidden">
      {children}

      <div className="mt-12 flex justify-center">
        <Button color="secondary" onClick={!isLoading ? closeModal : () => {}}>
          <Trans>Annuler</Trans>
        </Button>
      </div>
    </ReactModal>
  )
}
