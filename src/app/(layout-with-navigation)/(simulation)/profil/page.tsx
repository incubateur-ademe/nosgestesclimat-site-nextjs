import Trans from '@/components/translation/Trans'
import UserInformationForm from '@/components/user/UserInformationForm'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import { FormProvider } from '@/publicodes-state'
import AnswerList from './_components/AnswerList'
import Localisation from './_components/Localisation'
import PersonaWarning from './_components/PersonaWarning'
import SimulationBanner from './_components/SimulationBanner'
import SimulationList from './_components/SimulationList'

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
  const supportedRegions = await getSupportedRegions()

  return (
    <FormProvider>
      <Title title={<Trans>Mon profil</Trans>} />

      <PersonaWarning />

      <SimulationBanner />

      <Localisation supportedRegions={supportedRegions} />

      <AnswerList />

      <SimulationList />

      <Separator />

      <UserInformationForm
        title={
          <h3>
            <Trans>Mes informations</Trans>
          </h3>
        }
      />
    </FormProvider>
  )
}
