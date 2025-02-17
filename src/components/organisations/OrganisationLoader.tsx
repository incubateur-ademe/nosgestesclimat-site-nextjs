'use client'

import Loader from '@/design-system/layout/Loader'
import TransClient from '../translation/trans/TransClient'

export default function OrganisationLoader() {
  return (
    <div className="py-12 text-center">
      <Loader color="dark" className="mb-8" />
      <p>
        <TransClient>
          Nous récupérons les données de votre organisation...
        </TransClient>
      </p>
    </div>
  )
}
