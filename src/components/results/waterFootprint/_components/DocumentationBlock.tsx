import Trans from '@/components/translation/trans/TransServer'
import {
  captureEndClickDocumentationServer,
  endClickDocumentationServer,
} from '@/constants/tracking/pages/end'
import type { Locale } from '@/i18nConfig'
import Link from 'next/link'

interface Props {
  locale: Locale
}

export default function DocumentationBlock({ locale }: Props) {
  return (
    <div>
      <h2 className="title-lg">
        <Trans locale={locale} i18nKey="simulation.eau.documentation.title">
          Comment est calculée votre empreinte ?
        </Trans>
      </h2>

      <p>
        <Trans
          locale={locale}
          i18nKey="simulation.eau.documentation.description">
          Notre calculateur repose sur un modèle de données, dont l'intégralité
          des calculs est documentée ; les données affichées sont directement
          associées à votre test.
        </Trans>
      </p>

      <Link
        href="/documentation/bilan"
        className="text-primary-700 flex items-center underline"
        data-track-event={endClickDocumentationServer}
        data-track-posthog={captureEndClickDocumentationServer}>
        <Trans locale={locale} i18nKey="simulation.eau.documentation.link">
          Comprendre le calcul
        </Trans>
      </Link>
    </div>
  )
}
