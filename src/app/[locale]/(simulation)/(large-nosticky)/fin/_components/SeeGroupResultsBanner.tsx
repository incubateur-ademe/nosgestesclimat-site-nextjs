import Trans from '@/components/translation/trans/TransServer'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import type { Locale } from '@/i18nConfig'

interface Props {
  locale: Locale
  name?: string
  url?: string
}

export default function SeeGroupResultsBanner({ locale, name, url }: Props) {
  if (!name || !url) return null

  return (
    <div className="bg-secondary-50 flex w-full flex-col items-center gap-4 rounded-lg px-4 py-6">
      <div className="text-center">
        <h2 className="mb-1 text-lg font-bold">
          <Trans i18nKey="fin.seeGroupResultsBanner.title" locale={locale}>
            Merci d'avoir complété le test !
          </Trans>
        </h2>

        <p className="mb-0 text-center text-lg">
          <Trans i18nKey="fin.seeGroupResultsBanner.text" locale={locale}>
            Découvrez les résultats du test collectif
          </Trans>{' '}
          "{name}"
        </p>
      </div>

      <ButtonLink href={url}>
        <Trans i18nKey="fin.seeGroupResultsBanner.button" locale={locale}>
          Voir les résultats
        </Trans>
      </ButtonLink>
    </div>
  )
}
