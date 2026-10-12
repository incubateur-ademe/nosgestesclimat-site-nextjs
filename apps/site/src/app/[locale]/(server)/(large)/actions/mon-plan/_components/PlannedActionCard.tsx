import { ImpactTag } from '@/components/actions/ImpactTag'
import { classesByTheme } from '@/components/actions/theme/constants/classesByTheme'
import ArrowNarrowRightIcon from '@/components/icons/ArrowNarrowRightIcon'
import Trans from '@/components/translation/trans/TransServer'
import { getActionHref } from '@/helpers/actions/getActionHref'
import type { Locale } from '@/i18nConfig'
import type { PersonalizedAction } from '@nosgestesclimat/core/features/actions/types/action'
import { twMerge } from 'cn'
import Link from 'next/link'
import RemoveFromPlanButton from './RemoveFromPlanButton'

interface PlannedActionCardProps {
  action: PersonalizedAction
  locale: Locale
}

export default function PlannedActionCard({
  action,
  locale,
}: PlannedActionCardProps) {
  const href = getActionHref({ action, locale })

  return (
    <article
      className={twMerge(
        'relative flex items-center gap-4 rounded-lg border border-l-8 bg-white px-6 py-4',
        'transition-shadow duration-300 ease-out focus-within:shadow-sm hover:shadow-sm',
        classesByTheme[action.theme.key].planCard
      )}>
      <div className="flex grow flex-col gap-2">
        <h3 className="mb-0 text-base/normal font-bold">{action.title}</h3>

        {action.assessment ? (
          <div>
            <ImpactTag impact={action.assessment.impact} locale={locale} />
          </div>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <RemoveFromPlanButton action={action} />

        <ArrowNarrowRightIcon className="text-primary-700 h-3 w-4" />
      </div>

      <Link
        href={href}
        className="focus-visible:inset-ring-primary-700 absolute -inset-px -left-2 z-10 rounded-lg">
        <span className="sr-only">
          <Trans
            locale={locale}
            i18nKey="actions.components.actionCard.link"
            values={{ actionTitle: action.title }}>
            Voir l'action
            <span className="sr-only"> "{'{{actionTitle}}'}"</span>
          </Trans>
        </span>
      </Link>
    </article>
  )
}
