'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'

export default function SondagesBlock() {
  return (
    <div>
      <Separator className="mb-4 mt-8" />
      <h3 className="text-md mb-1 font-bold">
        <Trans>Entreprises, collectivités, écoles</Trans>
      </h3>
      <p>
        <Trans i18nKey="SondagesBlock.description">
          Les <strong>sondages</strong> et <strong>conférences</strong> vous
          permettent de comparer votre empreinte en direct ou en groupes de plus
          de 20 personnes
        </Trans>
      </p>
      <Link className="font-bold" href="https://sondages.nosgestesclimat.fr">
        <Trans>Commencer</Trans>
      </Link>
    </div>
  )
}
