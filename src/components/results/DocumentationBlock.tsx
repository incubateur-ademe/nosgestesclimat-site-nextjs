'use client'

import BookClosedIcon from '@/components/icons/BookClosedIcon'
import Trans from '@/components/translation/trans/TransClient'
import { trackEndClickDocumentation } from '@/constants/tracking/pages/end'
import InlineLink from '@/design-system/inputs/InlineLink'
import Title from '@/design-system/layout/Title'

export default function DocumentationBlock() {
  return (
    <div className="mb-8">
      <Title tag="h2">
        <Trans>Comment est calculée votre empreinte ?</Trans>
      </Title>

      <p>
        <Trans>
          Notre calculateur repose sur un modèle de données, dont l'intégralité
          des calculs est documentée ; les données affichées sont directement
          associées à votre test.
        </Trans>
      </p>

      <InlineLink
        href="/documentation/bilan"
        className="flex items-center"
        onClick={() => trackEndClickDocumentation()}>
        <BookClosedIcon className="fill-primary-700 mr-2 w-4" />

        <Trans>Comprendre le calcul</Trans>
      </InlineLink>
    </div>
  )
}
