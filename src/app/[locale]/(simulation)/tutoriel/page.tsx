'use client'

import Title from '@/design-system/layout/Title'
import ButtonStart from './_components/ButtonStart'

import ContentLarge from '@/components/layout/ContentLarge'
import Trans from '@/components/translation/trans/TransClient'
import { twMerge } from 'tailwind-merge'
import AutresQuestions from './_components/AutresQuestions'
import AvantDeCommencer from './_components/AvantDeCommencer'
import ButtonBack from './_components/ButtonBack'
import OrganisationMessage from './_components/OrganisationMessage'

export default function Tutoriel() {
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
              <Trans>chrono pour calculer votre empreinte carbone et eau</Trans>
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
