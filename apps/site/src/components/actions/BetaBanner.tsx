import { BannerContent } from '@/design-system/cms/BannerContent'
import { getLocale } from '@/helpers/getLocale'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Trans from '../translation/trans/TransServer'

export default async function BetaBanner() {
  const locale = await getLocale()
  const { t } = await getServerTranslation()

  return (
    <div className="-mt-2 mb-8 md:-mt-4">
      <BannerContent
        color="secondary"
        banner={{
          text: (
            <Trans i18nKey={'actions.beta-banner.content'} locale={locale}>
              Cette <strong>version bêta</strong> est en cours d'amélioration.
              Aidez-nous à l’améliorer en{' '}
              <a
                href="https://tally.so/r/rjvbvR"
                target="_blank"
                className="font-bold underline"
                aria-label={t(
                  'actions.beta-banner.link.aria-label',
                  'Laisser votre avis, nouvelle fenêtre'
                )}>
                laissant votre avis.
              </a>
            </Trans>
          ),
          id: 'beta-banner',
        }}
      />
    </div>
  )
}
