import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getSupportedRegions } from '@/helpers/getSupportedRegions'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import AnswerList from './_components/AnswerList'
import Localisation from './_components/Localisation'
import PersonaWarning from './_components/PersonaWarning'
import SimulationBanner from './_components/SimulationBanner'
import SimulationList from './_components/SimulationList'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Mon profil, voir mon empreinte carbone - Nos Gestes Climat',
    description:
      'Explorez et modifiez les informations que vous avez saisies dans le parcours nosgestesclimat.',
    alternates: {
      canonical: '/profil',
    },
  })
}

export default async function Profil() {
  const supportedRegions = await getSupportedRegions()

  return (
    <FormProvider>
      <Title title={<Trans>Mon profil</Trans>} />
      <PersonaWarning />
      <SimulationBanner />
      <Localisation supportedRegions={supportedRegions} />
      <AnswerList />
      <SimulationList />
    </FormProvider>
  )
}
