import Trans from '@/components/translation/trans/TransServer'
import Badge from '@/design-system/layout/Badge'
import Card from '@/design-system/layout/Card'
import type { Locale } from '@/i18nConfig'

interface Props {
  locale: Locale
}

export default function CollectiveEfforts({ locale }: Props) {
  return (
    <div className="mt-6">
      <Badge className="text-default border-none">
        <Trans
          locale={locale}
          i18nKey="results.objective.collectiveEffort.title">
          Important : c'est aussi un effort collectif
        </Trans>
      </Badge>

      <Card className="mb-12 flex-col gap-4 md:flex-row">
        <article>
          <h1 className="mb-5">
            <Badge color="purple" className="border-none">
              <Trans
                locale={locale}
                i18nKey="results.objective.collectiveEffort.state">
                L'État français
              </Trans>
            </Badge>
          </h1>
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
          <h1 className="mb-5">
            <Badge color="yellow" className="border-none">
              <Trans
                locale={locale}
                i18nKey="results.objective.collectiveEffort.society">
                Toute la société
              </Trans>
            </Badge>
          </h1>
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
