import PlusIcon from '@/components/icons/PlusIcon'
import Trans from '@/components/translation/trans/TransServer'
import CTACard from '@/design-system/actions/CTACard'
import {
  baseClassNames,
  colorClassNames,
  sizeClassNames,
} from '@/design-system/buttons/Button'
import Title from '@/design-system/layout/Title'
import type { Locale } from '@/i18nConfig'
import type { Group } from '@/types/groups'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import GroupContent from './groups/GroupContent'

type Props = {
  groups: Group[]
  locale: Locale
}

export default function Groups({ groups, locale }: Props) {
  return (
    <>
      <Title
        tag="h2"
        title={
          <Trans locale={locale} i18nKey="mon-espace.groups.title">
            Mes groupes "Amis" et "Famille"
          </Trans>
        }
      />
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        <div className="flex-1">
          <GroupContent groups={groups} />
        </div>

        <CTACard
          href="/mon-espace/groupes/creer"
          className="hidden md:block"
          label={
            <Trans locale={locale} i18nKey="mon-espace.groups.create">
              Créer un groupe
            </Trans>
          }
          color="secondary"
          imageAlt=""
          imageSrc="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/medium_people_raising_arm_fe915601cd.png"
          icon={<PlusIcon className="stroke-primary-700 min-w-8" />}
          ctaClassName="min-w-64"
        />

        <Link
          href="/mon-espace/groupes/creer"
          className={twMerge(
            'block md:hidden',
            baseClassNames,
            sizeClassNames.md,
            colorClassNames.secondary
          )}>
          <PlusIcon className="stroke-primary-700 min-w-8" />
          <Trans locale={locale} i18nKey="mon-espace.groups.create">
            Créer un groupe
          </Trans>
        </Link>
      </div>
    </>
  )
}
