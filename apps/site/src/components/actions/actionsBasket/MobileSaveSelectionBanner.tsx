import Trans from '@/components/translation/trans/TransServer'
import BottomBannerWithCTA from '@/design-system/layout/BottomBannerWithCTA'
import CountBadge from '@/design-system/layout/CountBadge'
import type { Locale } from '@/i18nConfig'
import SavePlanLink from './SavePlanLink'

interface Props {
  locale: Locale
  actionsLength: number
}

export default function MobileSaveSelectionBanner({
  locale,
  actionsLength,
}: Props) {
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
