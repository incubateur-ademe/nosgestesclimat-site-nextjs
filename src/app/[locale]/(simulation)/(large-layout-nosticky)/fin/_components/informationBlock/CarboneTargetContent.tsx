'use client'

import Link from '@/components/Link'
import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon'
import TransClient from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import TargetQuestions from './carboneTargetContent/AdditionalQuestions'
import TargetChart from './carboneTargetContent/TargetChart'

type Props = {
  isOpen: boolean
  isHedgehog: boolean
}

const questions = [
  {
    slug: 'est-ce-que-je-peux-y-arriver-tout-seul',
    question: (
      <TransClient>Est-ce que je peux y arriver tout seul ?</TransClient>
    ),
    answer: (
      <p>
        <TransClient>
          Il est quasiment impossible de vivre à moins de 2 tonnes dans notre
          société actuellement.{' '}
          <span className="text-secondary-700">
            L’État, les collectivités locales, le secteur privé et les citoyens
          </span>{' '}
          devront tous contribuer pour atteindre cet objectif.
        </TransClient>
      </p>
    ),
  },
  {
    slug: 'par-ou-commencer',
    question: <TransClient>Par où commencer ?</TransClient>,
    answer: (
      <p>
        <TransClient>
          Maintenant que vous avez fait votre bilan carbone et que vous avez
          pris conscience de votre empreinte, vous pouvez découvrir{' '}
          <Link href="/actions">l’ensemble des gestes</Link> qui vous
          permettront d’atteindre progressivement l’objectif de 2 tonnes.
        </TransClient>
      </p>
    ),
  },
]

export default function CarboneTargetContent({ isOpen, isHedgehog }: Props) {
  const [isQuestionOpen, setIsQuestionOpen] = useState(false)

  return (
    <>
      <div className={twMerge('lg:hidden', isOpen ? '' : '-mb-8')}>
        <Title
          tag="h2"
          className="text-lg lg:text-2xl"
          hasSeparator={isOpen}
          title={
            <TransClient>
              <strong className="text-secondary-700 font-black">
                2 tonnes
              </strong>{' '}
              en 2050 ?
            </TransClient>
          }
        />
      </div>
      <div className="hidden lg:block">
        <Title
          tag="h2"
          className="text-lg lg:text-2xl"
          title={
            <TransClient>
              <strong className="text-secondary-700 font-black">
                2 tonnes
              </strong>{' '}
              en 2050 ?
            </TransClient>
          }
        />
      </div>
      <div
        className={twMerge(
          'lg:block',
          isOpen || isHedgehog ? 'block' : 'hidden'
        )}>
        <p>
          <TransClient>
            C’est l’objectif à atteindre pour espérer limiter le réchauffement
            climatique à 2 degrés.
          </TransClient>
        </p>
        <TargetChart isQuestionOpen={isQuestionOpen} />
        <TargetQuestions
          setIsQuestionOpen={setIsQuestionOpen}
          questions={questions}
        />
        <div className="flex justify-end">
          <Link className="text-sm" href="/empreinte-climat" target="_blank">
            <TransClient>En savoir plus</TransClient>{' '}
            <ExternalLinkIcon className="stroke-primary-700" />
          </Link>
        </div>
      </div>
    </>
  )
}
