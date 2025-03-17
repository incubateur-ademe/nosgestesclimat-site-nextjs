import ToastDisplay from '@/components/messages/ToastDisplay'
import Trans from '@/components/translation/trans/TransServer'
import UserInformationForm from '@/components/user/UserInformationForm'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import { FormProvider } from '@/publicodes-state'
import type { DefaultPageProps } from '@/types'
import Image from 'next/image'
import AnswerList from './_components/AnswerList'
import Localisation from './_components/Localisation'
import PersonaWarning from './_components/PersonaWarning'
import SimulationBanner from './_components/SimulationBanner'
import SimulationList from './_components/SimulationList'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: t('Mon profil, voir mon empreinte carbone - Nos Gestes Climat'),
    description: t(
      'Explorez et modifiez les informations que vous avez saisies dans le parcours nosgestesclimat.'
    ),
    alternates: {
      canonical: '/profil',
    },
  })
}

export default async function Profil({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  const supportedRegions = getSupportedRegions()

  return (
    <FormProvider>
      <Title title={<Trans locale={locale}>Mon profil</Trans>} />

      <PersonaWarning />

      <div className="flex flex-wrap items-start gap-20 md:flex-nowrap">
        <SimulationBanner />
        <Image
          className="ml-auto hidden md:block"
          src="/images/illustrations/girl-thinking.png"
          width="360"
          height="400"
          alt={t('Une fille réfléchissant à son empreinte carbone.')}
        />
      </div>

      <Localisation supportedRegions={supportedRegions} />

      <AnswerList />

      <SimulationList />

      <Separator />

      <div className="mb-12 flex flex-wrap gap-16 md:flex-nowrap">
        <UserInformationForm
          title={
            <h3>
              <Trans locale={locale}>Mes informations</Trans>
            </h3>
          }
        />
        <Image
          className="-mt-12 ml-auto w-48 self-end md:mt-auto md:w-auto"
          src="/images/illustrations/delivering-mail.png"
          width="350"
          height="400"
          alt={t('Une personne livrant du courrier.')}
        />
      </div>

      <ToastDisplay />
    </FormProvider>
  )
}
