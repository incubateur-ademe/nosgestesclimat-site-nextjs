'use client'

import TransClient from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import { usePersonas } from '@/hooks/usePersonas'
import PersonaExplanations from './_components/PersonaExplanations'
import PersonaList from './_components/PersonaList'

export default function Personas() {
  const { data: personas, isFetched } = usePersonas()

  return (
    <>
      <Title
        title={<TransClient>Personas</TransClient>}
        data-cypress-id="personas-title"
      />
      <p>
        <TransClient>
          Les personas nous servent à tester le calculateur sous toutes ses
          coutures, et à vérifier qu’il s’adapte bien à toutes les situations de
          vie des citoyens métropolitains. De par leur présence, ils nous
          forcent à penser à tous les cas d’usage, pour nous projeter dans
          différentes réalités, et inclure ces réalités dans nos refontes du
          parcours de test et des actions proposées à la fin de ce dernier.
        </TransClient>
      </p>
      <p>
        <TransClient>
          Cette page vous permet de naviguer dans les parcours Nos Gestes Climat
          comme si vous étiez l'un des profils types que nous avons listés.
        </TransClient>
      </p>
      {isFetched && personas ? <PersonaList personas={personas} /> : null}
      <PersonaExplanations />
    </>
  )
}
