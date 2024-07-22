import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ExternalLinkIcon from '@/design-system/icons/ExternalLinkIcon'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import TargetQuestions from './carboneTargetContent/AdditionalQuestions'

type Props = {
  isOpen: boolean
  isHedgehog: boolean
}

const title = (
  <span className="lg:tracking-tight	">
    <Trans>
      <strong className="font-black text-secondary-700">
        L’empreinte eau,
      </strong>{' '}
      c’est quoi ?
    </Trans>
  </span>
)
const questions = [
  {
    slug: 'eau-consommee-prelevee',
    question: <Trans>Qu'est-ce que de l'eau consommée ?</Trans>,
    answer: (
      <p>
        <Trans>
          L'eau consommée est la partie de l'eau prélevée évaporée lors de son
          utilisation. Elle n'est donc plus disponible pour son ecosystème.
        </Trans>
      </p>
    ),
  },
  {
    slug: 'bleue-verte-grise',
    question: <Trans>Eau bleue, verte ou grise ?</Trans>,
    answer: (
      <>
        <p>
          <Trans>L’empreinte eau a trois composantes :</Trans>
        </p>
        <ul className="list-disc pl-4">
          <li>
            <Trans>
              L'eau bleue : c’est la consommation des eaux de surface et des
              eaux souterraines
            </Trans>
          </li>
          <li>
            <Trans>
              L'eau verte : c’est la consommation des eaux de pluie, notamment
              par évaporation dans les cultures agricoles
            </Trans>
          </li>
          <li>
            <Trans>
              L'eau grise : c’est le volume d’eau douce requis pour diluer les
              polluants dans des proportions suffisantes pour que la qualité de
              l’eau corresponde aux normes en vigueur
            </Trans>
          </li>
        </ul>
      </>
    ),
  },
]
export default function IndirectWaterContent({ isOpen, isHedgehog }: Props) {
  const [isQuestionOpen, setIsQuestionOpen] = useState(false)

  return (
    <>
      <div className={twMerge('lg:hidden', isOpen ? '' : '-mb-8')}>
        <Title
          tag="h2"
          className="text-lg lg:text-2xl"
          hasSeparator={isOpen}
          title={title}
        />
      </div>
      <div className="hidden lg:block">
        <Title tag="h2" className=" text-lg lg:text-2xl" title={title} />
      </div>
      <div
        className={twMerge(
          'lg:block',
          isOpen || isHedgehog ? 'block' : 'hidden'
        )}>
        <p>
          L'empreinte eau, c'est l'ensemble de l'eau consommée pour produire et
          distribuer les biens et services de votre quotidien.
          <span className={isQuestionOpen ? 'hidden' : 'inline'}>
            {' '}
            C'est par exemple :
          </span>
        </p>
        <ul className={twMerge('mb-4', isQuestionOpen ? 'hidden' : 'block')}>
          <li className="mb-1 flex items-start gap-3">
            <Emoji className="mt-1 text-2xl">🍅</Emoji>
            <span className="flex-1">
              L'eau qui fait pousser les{' '}
              <strong className="text-secondary-700">
                fruits, légumes et céréales
              </strong>{' '}
              que vous mangez
            </span>
          </li>
          <li className="mb-1 flex items-start gap-3">
            <Emoji className="mt-1 text-2xl">👕</Emoji>
            <span className="flex-1">
              L'eau qui sert à la culture du{' '}
              <strong className="text-secondary-700">coton</strong> que vous
              portez
            </span>
          </li>
          <li className="mb-1 flex items-start gap-3">
            <Emoji className="mt-1 text-2xl">🐮</Emoji>
            <span className="flex-1">
              L'eau qui sert à produire l'alimentation des{' '}
              <strong className="text-secondary-700">animaux</strong> que vous
              consommez
            </span>
          </li>
          <li className="mb-1 flex items-start gap-3">
            <Emoji className="mt-1 text-2xl">📱</Emoji>
            <span className="flex-1">
              L'eau qui a servi à extraire les matériaux de vos{' '}
              <strong className="text-secondary-700">
                appareils numériques
              </strong>
            </span>
          </li>
        </ul>
        <TargetQuestions
          setIsQuestionOpen={setIsQuestionOpen}
          questions={questions}
        />
        <div className="flex justify-end">
          <Link className="text-sm" href="/empreinte-eau" target="_blank">
            <Trans>En savoir plus</Trans>{' '}
            <ExternalLinkIcon className="stroke-primary-700" />
          </Link>
        </div>
      </div>
    </>
  )
}
