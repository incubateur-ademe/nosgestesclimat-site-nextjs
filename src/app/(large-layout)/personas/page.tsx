import Providers from '@/components/providers/Providers'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getPersonas } from '@/helpers/modelFetching/getPersonas'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import PersonaExplanations from './_components/PersonaExplanations'
import PersonaList from './_components/PersonaList'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t("Nos personas d'utilisateurs types - Nos Gestes Climat"),
    description: t(
      "Découvrez les personas d'utilisateurs types qui nous servent à tester le simulateur sous toutes ses coutures."
    ),
    alternates: {
      canonical: '/personas',
    },
  })
}

type Props = {
  params: {
    locale: string
  }
}
export default async function Personas({ params: { locale } }: Props) {
  const supportedRegions = await getSupportedRegions()
  const personas = await getPersonas({ locale })

  return (
    <Providers supportedRegions={supportedRegions}>
      <Title title={<Trans>Personas</Trans>} data-cypress-id="personas-title" />
      <p>
        <Trans>
          Les personas nous servent à tester le simulateur sous toutes ses
          coutures, et à vérifier qu’il s’adapte bien à toutes les situations de
          vie des citoyens métropolitains. De par leur présence, ils nous
          forcent à penser à tous les cas d’usage, pour nous projeter dans
          différentes réalités, et inclure ces réalités dans nos refontes du
          parcours de test et des actions proposées à la fin de ce dernier.
        </Trans>
      </p>
      <p>
        <Trans>
          Cette page vous permet de naviguer dans les parcours Nos Gestes Climat
          comme si vous étiez l'un des profils types que nous avons listés.
        </Trans>
      </p>
      <PersonaList personas={personas} />
      <PersonaExplanations />
    </Providers>
  )
}
