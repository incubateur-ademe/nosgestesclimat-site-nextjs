import Title from '@/design-system/layout/Title'
import ButtonStart from './_components/ButtonStart'

import ContentLarge from '@/components/layout/ContentLarge'
import ContentNarrow from '@/components/layout/ContentNarrow'
import Trans from '@/components/translation/trans/TransServer'
import { noIndexObject } from '@/constants/metadata'
import { SIMULATOR_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { DefaultPageProps } from '@/types'
import Image from 'next/image'
import posthog from 'posthog-js'
import { twMerge } from 'tailwind-merge'
import AutresQuestions from './_components/AutresQuestions'
import AvantDeCommencer from './_components/AvantDeCommencer'
import ButtonBack from './_components/ButtonBack'
import CategoriesProgressBar from './_components/CategoriesProgressBar'
import OrganisationMessage from './_components/OrganisationMessage'
import TutorialListItem from './_components/TutorialListItem'

export const generateMetadata = getCommonMetadata({
  title: t('Tutoriel du calculateur - Nos Gestes Climat'),
  description: t(
    'Comprenez comment calculer votre empreinte sur le climat en 10min chrono.'
  ),
  alternates: { canonical: '/tutoriel' },
  robots: noIndexObject,
})

export default async function Tutoriel({ params }: DefaultPageProps) {
  const { locale } = await params
  console.log(posthog.getFeatureFlag('ab-test-nouvelle-page-tutoriel'))
  if (
    posthog.getFeatureFlag('ab-test-nouvelle-page-tutoriel') === 'new-tutorial'
  ) {
    return (
      <ContentNarrow className="text-center">
        <div className="hidden text-center md:block">
          <CategoriesProgressBar />
        </div>

        <p className="text-secondary-800 mb-2 text-lg font-bold">
          <Trans locale={locale}>Règles du test</Trans>
        </p>

        <h1 className="mb-10 text-2xl font-medium sm:text-4xl">
          <Trans locale={locale}>Comment ça marche ? </Trans>
        </h1>

        <ol className="mb-6 flex flex-col gap-4 md:mb-16">
          <TutorialListItem
            index={1}
            title={
              <>
                <strong>
                  <Trans locale={locale}>C’est un test personnel</Trans>
                </strong>{' '}
                -{' '}
                <span>
                  <Trans locale={locale}>
                    répondez pour vous uniquement, pas votre foyer
                  </Trans>
                </span>
              </>
            }
          />

          <TutorialListItem
            index={2}
            title={
              <>
                <strong>
                  <Trans locale={locale}>On parle de votre vie privée</Trans>
                </strong>{' '}
                -{' '}
                <span>
                  <Trans locale={locale}>pas de votre travail</Trans>
                </span>
              </>
            }
          />

          <TutorialListItem
            index={3}
            title={
              <>
                <strong>
                  <Trans locale={locale}>Aucune pression</Trans>
                </strong>{' '}
                -{' '}
                <span>
                  <Trans locale={locale}>
                    il ne s’agit pas d’être parfait, mais de comprendre son
                    impact
                  </Trans>
                </span>
              </>
            }
          />
        </ol>

        <ButtonLink size="xl" className="self-center" href={SIMULATOR_PATH}>
          <Trans locale={locale}>Démarrer</Trans>{' '}
          <span
            className="ml-2 inline-flex h-6 items-center text-2xl"
            aria-hidden>
            →
          </span>
        </ButtonLink>

        <Image
          src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/comparer_empreinte_carbone_et_eau_entre_amis_4d3765d837.svg"
          alt={t('Un groupe d’amis jouant à un jeu de société.')}
          width={400}
          height={400}
          className="mx-auto mt-8"
        />
      </ContentNarrow>
    )
  } else {
    return (
      <ContentLarge className="mt-10 px-4 lg:px-0">
        <div className="mx-auto flex max-w-3xl flex-col overflow-auto">
          <Title
            data-cypress-id="tutoriel-title"
            className="text-lg md:text-2xl"
            title={
              <>
                <span className="text-secondary-700 inline">
                  <Trans locale={locale}>10 minutes</Trans>
                </span>{' '}
                <Trans locale={locale}>
                  chrono pour calculer votre empreinte carbone et eau
                </Trans>
              </>
            }
          />

          <AvantDeCommencer />

          <div className={twMerge('mb-12 flex w-full gap-4 sm:px-4 md:px-0')}>
            <ButtonBack />

            <OrganisationMessage />

            <ButtonStart />
          </div>

          <AutresQuestions />
        </div>
      </ContentLarge>
    )
  }
}
