import Title from '@/design-system/layout/Title'
import ButtonStart from './_components/ButtonStart'

import ContentLarge from '@/components/layout/ContentLarge'
import TransServer from '@/components/translation/trans/TransServer'
import { noIndexObject } from '@/constants/metadata'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { twMerge } from 'tailwind-merge'
import AutresQuestions from './_components/AutresQuestions'
import AvantDeCommencer from './_components/AvantDeCommencer'
import ButtonBack from './_components/ButtonBack'
import OrganisationMessage from './_components/OrganisationMessage'
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { t } = await getServerTranslation(locale)

  return getMetadataObject({
    locale,
    title: t(
      'Calculer votre empreinte carbone individuelle - Nos Gestes Climat'
    ),
    description: t(
      'Comprenez comment calculer votre empreinte sur le climat en 10min chrono.'
    ),
    alternates: { canonical: '/tutoriel' },
    robots: noIndexObject,
  })
}

export default async function Tutoriel({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return (
    <ContentLarge className="mt-10 px-4 lg:px-0">
      <div className="mx-auto flex h-screen max-w-3xl flex-col overflow-auto">
        <Title
          data-cypress-id="tutoriel-title"
          className="text-lg md:text-2xl"
          title={
            <>
              <span className="inline text-secondary-700">
                <TransServer locale={locale}>10 minutes</TransServer>
              </span>{' '}
              <TransServer locale={locale}>
                chrono pour calculer votre empreinte carbone et eau
              </TransServer>
            </>
          }
        />

        <AvantDeCommencer />

        <AutresQuestions />

        {/* Check if body has the "iframe-mode" class name and if so add the static class to the footer */}
        <div
          className={twMerge(
            'tutorial-footer fixed bottom-0 left-0 right-0 z-50 border-t-2 border-primary-200 bg-gray-100 py-3'
          )}>
          <div
            className={twMerge(
              'relative mx-auto flex w-full max-w-3xl justify-between gap-4 px-4 md:px-0 lg:justify-start'
            )}>
            <ButtonBack />

            <OrganisationMessage />

            <ButtonStart />
          </div>
        </div>
      </div>
    </ContentLarge>
  )
}
