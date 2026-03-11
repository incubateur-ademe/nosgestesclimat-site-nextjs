import { END_PAGE_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Badge from '@/design-system/layout/Badge'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import type { Locale } from '@/i18nConfig'
import DownArrow from '../icons/DownArrow'
import Trans from '../translation/trans/TransServer'

interface Props {
  locale: Locale
  simulationId: string
}

export default function ActionsBlock({ locale, simulationId }: Props) {
    <Card>
      <Title
        tag="h2"
        size="md"
        hasSeparator={false}
        className="text-secondary-700">
        <Trans locale={locale} i18nKey="results.actions.title">
          Votre plan d'action
        </Trans>
      </Title>

      <Title tag="h3" size="lg" hasSeparator={false}>
        <Trans locale={locale} i18nKey="results.actions.subtitle">
          Découvrez des gestes concrets pour y arriver
        </Trans>
      </Title>

      <div className="flex gap-4">
        <div className="w-md">
          <p className="mb-6">
            <Trans locale={locale} i18nKey="results.actions.text">
              Nous avons préparé des <strong>actions personnalisées</strong>{' '}
              pour vous aider à aller plus loin
            </Trans>
          </p>

          <ButtonLink
            href={`${END_PAGE_PATH.replace(':id', simulationId)}/actions`}>
            <Trans locale={locale} i18nKey="results.actions.linkLabel">
              Construire mon plan d’action
            </Trans>
            <DownArrow className="ml-2 w-6 -rotate-90" />
          </ButtonLink>
        </div>

        <div>
          <Badge color="blue">
            <Trans locale={locale}>Transport</Trans>
          </Badge>

          <Badge color="orange">
            <Trans locale={locale}>Alimentation</Trans>
          </Badge>

          <Badge color="green">
            <Trans locale={locale}>Logement</Trans>
          </Badge>
        </div>
      </div>
    </Card>
  )
}
