'use client'

import Loader from '@/design-system/layout/Loader'
import Emoji from '@/design-system/utils/Emoji'
import TransClient from '../translation/trans/TransClient'

export default function PollLoader() {
  return (
    <div className="py-12 text-center">
      <Loader color="dark" className="mb-8" />
      <p>
        <TransClient>Nous récupérons les données de la campagne...</TransClient>
      </p>
      <p className="text-sm text-gray-700">
        <TransClient>
          (Cela peut durer quelques dizaines de secondes pour les campagnes avec
          un grand nombre de participants ! Merci pour votre patience.)
        </TransClient>{' '}
        <Emoji>🙏</Emoji>
      </p>
    </div>
  )
}
