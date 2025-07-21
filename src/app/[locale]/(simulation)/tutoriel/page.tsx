'use client'

import Title from '@/design-system/layout/Title'
import ButtonStart from './_components/ButtonStart'

import ContentLarge from '@/components/layout/ContentLarge'
import ContentNarrow from '@/components/layout/ContentNarrow'
import Trans from '@/components/translation/trans/TransClient'
import {
  NEW_TUTORIAL_FLAG_KEY,
  NEW_TUTORIAL_VARIANT_KEY,
} from '@/constants/ab-test'
import { t } from '@/helpers/metadata/fakeMetadataT'
import Image from 'next/image'
import { useFeatureFlagVariantKey } from 'posthog-js/react'
import { twMerge } from 'tailwind-merge'
import AutresQuestions from './_components/AutresQuestions'
import AvantDeCommencer from './_components/AvantDeCommencer'
import ButtonBack from './_components/ButtonBack'
import CategoriesProgressBar from './_components/CategoriesProgressBar'
import OrganisationMessage from './_components/OrganisationMessage'
import TutorialListItem from './_components/TutorialListItem'

export default function Tutoriel() {
  const flagValue = useFeatureFlagVariantKey(NEW_TUTORIAL_FLAG_KEY)

  console.log('AB test tutoriel, variant :', flagValue)

  if (flagValue === NEW_TUTORIAL_VARIANT_KEY) {
    return (
      <ContentNarrow className="text-center">
        <div className="hidden text-center md:block">
          <CategoriesProgressBar />
        </div>

        <p className="text-secondary-800 mb-2 text-lg font-bold">
          <Trans>Règles du test</Trans>
        </p>

        <h1 className="mb-10 text-2xl font-medium sm:text-4xl">
          <Trans>Comment ça marche ? </Trans>
        </h1>

        <ol className="mb-6 flex flex-col gap-4 md:mb-16">
          <TutorialListItem
            index={1}
            title={
              <>
                <strong>
                  <Trans>C’est un test personnel</Trans>
                </strong>{' '}
                -{' '}
                <span>
                  <Trans>répondez pour vous uniquement, pas votre foyer</Trans>
                </span>
              </>
            }
          />

          <TutorialListItem
            index={2}
            title={
              <>
                <strong>
                  <Trans>On parle de votre vie privée</Trans>
                </strong>{' '}
                -{' '}
                <span>
                  <Trans>pas de votre travail</Trans>
                </span>
              </>
            }
          />

          <TutorialListItem
            index={3}
            title={
              <>
                <strong>
                  <Trans>Aucune pression</Trans>
                </strong>{' '}
                -{' '}
                <span>
                  <Trans>
                    il ne s’agit pas d’être parfait, mais de comprendre son
                    impact
                  </Trans>
                </span>
              </>
            }
          />
        </ol>

        <ButtonStart label={<Trans>Démarrer</Trans>} />

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
                  <Trans>10 minutes</Trans>
                </span>{' '}
                <Trans>
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
