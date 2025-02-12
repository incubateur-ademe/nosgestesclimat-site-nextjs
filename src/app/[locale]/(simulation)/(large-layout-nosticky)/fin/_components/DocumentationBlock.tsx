import BookClosedIcon from '@/components/icons/BookClosedIcon'
import Trans from '@/components/translation/Trans'
import { endClickDocumentation } from '@/constants/tracking/pages/end'
import InlineLink from '@/design-system/inputs/InlineLink'
import Title from '@/design-system/layout/Title'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function DocumentationBlock() {
  return (
    <div className="mb-8">
      <Title tag="h2">
        <Trans locale={locale}>Comment est calculée votre empreinte ?</Trans>
      </Title>

      <p>
        <Trans locale={locale}>
          Notre calculateur repose sur un modèle de données, dont l'intégralité
          des calculs est documentée ; les données affichées sont directement
          associées à votre test.
        </Trans>
      </p>

      <InlineLink
        href="/documentation/bilan"
        className="flex items-center"
        onClick={() => trackEvent(endClickDocumentation)}>
        <BookClosedIcon className="fill-primary-700 mr-2 w-4" />

        <Trans locale={locale}>Comprendre le calcul</Trans>
      </InlineLink>
    </div>
  )
}
