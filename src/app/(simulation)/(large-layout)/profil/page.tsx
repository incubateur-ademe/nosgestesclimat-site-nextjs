import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import Image from 'next/image'
import AnswerList from './_components/AnswerList'
import PersonaWarning from './_components/PersonaWarning'
import SimulationBanner from './_components/SimulationBanner'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Mon profil, voir mon empreinte carbone - Nos Gestes Climat'),
    description: t(
      'Explorez et modifiez les informations que vous avez saisies dans le parcours nosgestesclimat.'
    ),
    alternates: {
      canonical: '/profil',
    },
  })
}

export default async function Profil() {
  const { t } = await getServerTranslation()

  return (
    <FormProvider>
      <Title title={<Trans>Mon profil</Trans>} />

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

      <AnswerList />
    </FormProvider>
  )
}
