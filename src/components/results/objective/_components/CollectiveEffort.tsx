import Trans from '@/components/translation/trans/TransServer'
import Badge from '@/design-system/layout/Badge'
import Card from '@/design-system/layout/Card'
import type { Locale } from '@/i18nConfig'
import { twMerge } from 'tailwind-merge'

interface Props {
  locale: Locale
  className?: string
}

export default function CollectiveEfforts({ locale, className }: Props) {
  return (
    <div className={twMerge('mt-6', className)}>
      <Badge className="text-default border-none text-sm md:text-base">
        <Trans
          locale={locale}
          i18nKey="results.objective.collectiveEffort.title">
          Important : c'est aussi un effort collectif
        </Trans>
      </Badge>

      <Card className="mb-12 flex-col gap-4 md:flex-row">
        <article>
          <h3 className="mb-5">
            <Badge color="purple" className="border-none">
              <Trans
                locale={locale}
                i18nKey="results.objective.collectiveEffort.state">
                L'État français
              </Trans>
            </Badge>
          </h3>
          <p>
            <Trans
              locale={locale}
              i18nKey="results.objective.collectiveEffort.stateDescription">
              Réduction des services sociétaux (aujourd’hui à 1,55T) et
              décarbonation des infrastructures.
            </Trans>
          </p>
        </article>

        <article>
          <h3 className="mb-5">
            <Badge color="yellow" className="border-none">
              <Trans
                locale={locale}
                i18nKey="results.objective.collectiveEffort.society">
                Toute la société
              </Trans>
            </Badge>
          </h3>
          <p>
            <Trans
              locale={locale}
              i18nKey="results.objective.collectiveEffort.societyDescription">
              Diminution de l’empreinte des biens et des services par l’effort
              combiné des entreprises et collectivités.{' '}
            </Trans>
          </p>
        </article>
      </Card>
    </div>
  )
}
