import { ACTION_DETAIL_PATH } from '@/constants/urls/paths'
import { getLocalizedPath } from '@/helpers/language/getLocalizedPath'
import { LOCALE_EN_KEY, LOCALE_FR_KEY } from '@/i18nConfig'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import Trans from '../../translation/trans/TransServer'
import { ThemeBadge } from '../ThemeBadge'

import ActionTracker from '../ActionTracker'
import type { ActionCardProps } from './ActionCard'
import { classesByTheme } from './ActionCard'
import { ImpactTag } from './ImpactTag'
import { rankToEmoji } from './rankToEmoji'
import styles from './ActionCard.module.css'

export default function ActionCardVariantTeaserCTA({
  action,
  className,
  locale,
  withThemeBadge = true,
  assessmentStatus,
  rank,
  from,
  ...props
}: ActionCardProps) {
  const rankEmoji = rankToEmoji(rank)
  const actionDetailPath = ACTION_DETAIL_PATH(action.theme.slug, action.slug)
  // On an /en page, an unprefixed (fr) path would be redirected to /en by the
  // locale middleware, so force the /fr prefix instead of relying on
  // getLocalizedPath's "no prefix for the default locale" behavior.
  const actionPath =
    locale === LOCALE_EN_KEY && action.language === LOCALE_FR_KEY
      ? `/${LOCALE_FR_KEY}${actionDetailPath}`
      : getLocalizedPath(action.language, actionDetailPath)
  const href = from ? `${actionPath}?from=${from}` : actionPath
  return (
    <article
      {...props}
      className={twMerge(
        `relative flex min-h-38 flex-col gap-2 rounded-lg border border-t-8 bg-white p-2`,
        'translate-y-0 transition-[box-shadow_border-color_transform] duration-300 ease-out',
        'hover:-translate-y-0.5 hover:shadow-sm',
        'focus-within:-translate-y-0.5 focus-within:shadow-sm',
        classesByTheme[action.theme.key],
        className
      )}>
      <ActionTracker eventName="displayed" action={action} />
      {rankEmoji || withThemeBadge ? (
        <div className="flex items-center">
          {rankEmoji ? <span className="">{rankEmoji}</span> : null}
          {withThemeBadge ? <ThemeBadge theme={action.theme} /> : null}
        </div>
      ) : null}
      <div className="grow">
        <h3 className="mb-2 text-base/normal font-bold">{action.title}</h3>
        {action.assessment ? (
          <ImpactTag
            impact={action.assessment.impact}
            locale={locale}
            assessmentStatus={assessmentStatus}
          />
        ) : null}
      </div>
      <Link
        href={href}
        className={twMerge(
          'focus-visible:inset-ring-primary-700 absolute -inset-px -top-2 z-10 rounded-lg',
          styles.actionLink
        )}>
        <span className="sr-only">
          <Trans
            locale={locale}
            i18nKey="actions.components.actionCard.link"
            values={{ actionTitle: action.title }}>
            Voir l'action "{'{{actionTitle}}'}"
          </Trans>
        </span>
      </Link>
    </article>
  )
}
