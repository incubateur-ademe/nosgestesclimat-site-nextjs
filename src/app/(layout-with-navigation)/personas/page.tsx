import Providers from '@/components/providers/Providers'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import fetchPersonas from '@/helpers/fetchPersonas'
import { getSupportedRegions } from '@/helpers/getSupportedRegions'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import PersonaExplanations from './_components/PersonaExplanations'
import PersonaList from './_components/PersonaList'

export async function generateMetadata() {
  return getMetadataObject({
    title: "Nos personas d'utilisateurs types - Nos Gestes Climat",
    description:
      "Découvrez les personas d'utilisateurs types qui nous servent à tester le simulateur sous toutes ses coutures.",
    alternates: {
      canonical: '/personas',
    },
  })
}

export default async function Personas() {
  const supportedRegions = await getSupportedRegions()
  const personas = await fetchPersonas()

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
