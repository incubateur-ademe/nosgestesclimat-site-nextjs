import {
  ACTIONS_MY_PLAN_PATH,
  END_PAGE_ACTIONS_PATH,
} from '@/constants/urls/paths'
import ButtonLinkServer from '@/design-system/buttons/ButtonLinkServer'
import CountBadge from '@/design-system/layout/CountBadge'
import type { ActionPlan } from '@nosgestesclimat/core/features/actions/types/action'
import { cn } from 'cn'
import { Star } from 'lucide-react'
import FileWithMagnifierIcon from '../icons/FileWithMagnifierIcon'
import Trans from '../translation/trans/TransServer'

const ACTIVE_LINK_CLASSES = 'bg-primary-100 border-primary-300'
const INACTIVE_LINK_CLASSES = 'text-default border-slate-300'
// Pins the inactive look so the button's hover colors do not apply
const DISABLED_LINK_CLASSES =
  'hover:bg-transparent hover:border-slate-300 hover:text-default'

interface Props {
  plan: ActionPlan
  activeLink?: 'explore' | 'plan'
  exploreHref?: string
}

export default function ActionPlanLinks({
  plan,
  activeLink = 'explore',
  exploreHref = END_PAGE_ACTIONS_PATH,
}: Props) {
  const isExploreActive = activeLink === 'explore'
  const isPlanActive = activeLink === 'plan'
  const isPlanDisabled = plan.numberOfCommittedActions === 0

  return (
    <div className="mb-8 flex gap-4 overflow-auto">
      <ButtonLinkServer
        color="secondary"
        className={
          isExploreActive ? ACTIVE_LINK_CLASSES : INACTIVE_LINK_CLASSES
        }
        aria-current={isExploreActive ? 'page' : undefined}
        href={exploreHref}>
        <FileWithMagnifierIcon
          className={cn(
            'mr-2.5',
            isExploreActive ? 'fill-primary-700' : 'fill-default'
          )}
        />
        <Trans i18nKey="actions.plan.links.exploreActions">
          Explorer les actions
        </Trans>
      </ButtonLinkServer>

      <ButtonLinkServer
        color="secondary"
        className={cn(
          'relative pr-13!',
          isPlanActive && !isPlanDisabled
            ? ACTIVE_LINK_CLASSES
            : INACTIVE_LINK_CLASSES,
          isPlanDisabled && DISABLED_LINK_CLASSES
        )}
        aria-current={isPlanActive ? 'page' : undefined}
        href={ACTIONS_MY_PLAN_PATH}
        disabled={isPlanDisabled}>
        <Star
          className={cn(
            'mr-2.5 h-4',
            isPlanActive ? 'stroke-primary-700' : 'stroke-default'
          )}
        />
        <Trans i18nKey="actions.plan.links.myActionPlan">
          Mon plan d'action
        </Trans>

        <CountBadge
          value={plan.numberOfCommittedActions}
          className="absolute top-1/2 right-5 ml-2.5 size-5 -translate-y-1/2 text-sm"
        />
      </ButtonLinkServer>
    </div>
  )
}
