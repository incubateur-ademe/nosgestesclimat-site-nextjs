import Trans from '@/components/translation/trans/TransServer'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import type { Locale } from '@/i18nConfig'

interface Props {
  locale: Locale
  group: { name: string; href: string }
}

export default function GroupThankYouBlock({ locale, group }: Props) {
  return (
    <section className="mb-12 rounded-2xl bg-pink-100 px-8 py-10 text-center">
      <p className="mb-1 text-lg font-bold">
        <Trans locale={locale} i18nKey="results.groupThankYou.title">
          Merci d'avoir complété le test !
        </Trans>
      </p>

      <p className="mb-6 text-gray-700">
        <Trans
          locale={locale}
          i18nKey="results.groupThankYou.description"
          values={{ groupName: group.name }}>
          Découvrez les résultats du test collectif "{group.name}"
        </Trans>
      </p>

      <ButtonLink href={group.href} color="primary" size="md">
        <Trans locale={locale} i18nKey="results.groupThankYou.cta">
          Voir les résultats
        </Trans>
      </ButtonLink>
    </section>
  )
}
