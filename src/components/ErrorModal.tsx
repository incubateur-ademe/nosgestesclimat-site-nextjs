'use client'

import Button from '@/design-system/inputs/Button'
import Modal from '@/design-system/modals/Modal'
import React from 'react'
import Link from './Link'
import Trans from './translation/Trans'

interface ErrorModalProps {
  error: Error | null
}

const ErrorModal: React.FC<ErrorModalProps> = () => {
  return (
    <Modal isOpen={true} closeModal={() => {}} hasAbortButton={false}>
      <h2>
        <Trans>Oups ! Une erreur est survenue</Trans> 🐛
      </h2>

      <p>
        <Trans>
          Une erreur s'est produite ; veuillez recharger la page ou réessayer
          plus tard.
        </Trans>
      </p>

      <p>
        <Trans>
          Si le problème persiste, merci de{' '}
          <Link href="/contact">contacter le support</Link>.
        </Trans>
      </p>

      <div className="mt-10 flex w-full justify-center">
        <Button onClick={() => window.location.reload()}>
          <Trans>Recharger la page</Trans>
        </Button>
      </div>
    </Modal>
  )
}

export default ErrorModal
