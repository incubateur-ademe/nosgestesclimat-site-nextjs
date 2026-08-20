import Link from '@/components/Link'
import { ACTION_DETAIL_PATH } from '@/constants/urls/paths'
import { getLocalizedPath } from '@/helpers/language/getLocalizedPath'
import { LOCALE_EN_KEY, LOCALE_FR_KEY } from '@/i18nConfig'
import { twMerge } from 'tailwind-merge'
import Trans from '../../translation/trans/TransServer'
import { ThemeBadge } from '../ThemeBadge'

import ArrowNarrowRightIcon from '../../icons/ArrowNarrowRightIcon'
import ActionTracker from '../ActionTracker'
import { classesByTheme, type ActionCardProps } from './ActionCard'
import styles from './ActionCard.module.css'
import { ImpactTag } from './ImpactTag'
import { rankToEmoji } from './rankToEmoji'

export default function ActionCardVariantCTA({
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
        `relative flex min-h-50 flex-col gap-6 rounded-lg border border-t-8 bg-white`,
        'translate-y-0 transition-[box-shadow_border-color_transform] duration-300 ease-out',
        'hover:-translate-y-0.5 hover:shadow-md',
        'focus-within:-translate-y-0.5 focus-within:shadow-md',
        classesByTheme[action.theme.key],
        className
      )}>
      <ActionTracker eventName="displayed" action={action} />
      <div className="flex grow flex-col gap-2 px-4 pt-2">
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
      </div>
      <div className="border-t border-slate-100 p-4">
        <span
          aria-hidden="true"
          className="text-primary-700 flex items-center text-sm/normal font-bold">
          <Trans
            locale={locale}
            i18nKey="actions.components.actionCard.ctaVariant.link"
            values={{ actionTitle: action.title }}>
            Voir l'action<span className="sr-only"> "{'{{actionTitle}}'}"</span>
          </Trans>
          <ArrowNarrowRightIcon className="ml-1 h-2.5" />
        </span>
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
            i18nKey="actions.components.actionCard.ctaVariant.link"
            values={{ actionTitle: action.title }}>
            Voir l'action<span className="sr-only"> "{'{{actionTitle}}'}"</span>
          </Trans>
        </span>
      </Link>
    </article>
  )
}
