import Trans from '@/components/translation/trans/TransServer'
import BottomBannerWithCTA from '@/design-system/layout/BottomBannerWithCTA'
import CountBadge from '@/design-system/layout/CountBadge'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import type { Locale } from '@/i18nConfig'
import SavePlanLink from './SavePlanLink'

interface Props {
  locale: Locale
  totalImpact: number
  actionsLength: number
}

export default function MobileSaveSelectionBanner({
  locale,
  totalImpact,
  actionsLength,
}: Props) {
  const { formattedValue: formattedActionsImpactSum, unit } = formatFootprint(
    totalImpact,
    {
      locale,
      metric: 'carbone',
    }
  )

  return (
    <BottomBannerWithCTA className="lg:hidden">
      <SavePlanLink className="w-full max-w-[320px]">
        <span className="text-center">
          <span className="inline-block text-base/normal font-bold">
            <Trans
              locale={locale}
              i18nKey="actions.seeActionPlanLink.mobile.label.firstLine">
              Voir mon plan d'action
            </Trans>
          </span>
          <CountBadge
            className="text-primary-700 ml-2 inline-flex size-6 bg-white"
            value={actionsLength}
          />
        </span>
      </SavePlanLink>
    </BottomBannerWithCTA>
  )
}
