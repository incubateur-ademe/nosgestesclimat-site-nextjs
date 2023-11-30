import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import fetchPersonas from '@/helpers/fetchPersonas'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Persona from './_components/Persona'
import PersonaExplanations from './_components/PersonaExplanations'

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
  const personas = await fetchPersonas()
  return (
    <>
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {Object.keys(personas).map((key) => (
          <Persona
            key={key}
            dottedName={key}
            persona={personas[key as keyof typeof personas]}
          />
        ))}
      </div>
      <PersonaExplanations />
    </>
  )
}
