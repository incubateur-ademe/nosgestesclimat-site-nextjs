'use client'

import Link from '@/components/Link'
import TransClient from '@/components/translation/TransClient'
import Separator from '@/design-system/layout/Separator'

export default function SondagesBlock() {
  return (
    <div>
      <Separator className="mb-4 mt-8" />
      <h3 className="text-md mb-1 font-bold">
        <TransClient>Entreprises, collectivités, écoles</TransClient>
      </h3>
      <p>
        <TransClient>
          Les <strong>sondages</strong> et <strong>conférences</strong> vous
          permettent de comparer votre empreinte en direct ou en groupes de plus
          de 20 personnes
        </TransClient>
      </p>
      <Link className="font-bold" href="/groupe">
        <TransClient>Commencer</TransClient>
      </Link>
    </div>
  )
}
