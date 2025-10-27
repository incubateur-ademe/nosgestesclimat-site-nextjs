import LockIcon from '@/components/icons/LockIcon'
import Trans from '@/components/translation/trans/TransServer'
import { MON_ESPACE_PATH, SIMULATOR_PATH } from '@/constants/urls/paths'
import {
  baseClassNames,
  colorClassNames,
  sizeClassNames,
} from '@/design-system/buttons/Button'
import type { Locale } from '@/i18nConfig'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import InstructionsBanner from './noResultsView/InstructionsBanner'
import ProfileTab from './ProfileTabs'

export default function NoResultsView({ locale }: { locale: Locale }) {
  return (
    <>
      <InstructionsBanner locale={locale} />

      <ProfileTab isLocked locale={locale} activePath={MON_ESPACE_PATH} />

      <div className="mt-2 flex flex-col rounded-lg bg-slate-50 p-8">
        <p className="mb-6 flex items-center justify-center text-lg font-bold">
          <LockIcon className="fill-default mr-4 inline-block" />
          <Trans locale={locale} i18nKey="mon-espace.noResults.description">
            Passez le test pour débloquer le contenu ici
          </Trans>
        </p>

        <div className="flex justify-center">
          <Link
            href={SIMULATOR_PATH}
            className={twMerge(
              baseClassNames,
              colorClassNames.secondary,
              sizeClassNames.md
            )}>
            <Trans locale={locale} i18nKey="mon-espace.noResults.link.text">
              Je calcule mon empreinte
            </Trans>
          </Link>
        </div>

        <div className="flex justify-center">
          <img
            src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/engagement_collectif_pour_le_climat_4f8f1edfc1.svg"
            alt=""
            width={340}
            className="grayscale"
          />
        </div>
      </div>
    </>
  )
}
