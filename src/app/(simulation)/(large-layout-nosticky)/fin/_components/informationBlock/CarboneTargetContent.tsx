import Link from '@/components/Link'
import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon'
import Trans from '@/components/translation/Trans'
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
    question: <Trans>Est-ce que je peux y arriver tout seul ?</Trans>,
    answer: (
      <p>
        <Trans>
          Il est quasiment impossible de vivre à moins de 2 tonnes dans notre
          société actuellement.{' '}
          <span className="text-secondary-700">
            L’État, les collectivités locales, le secteur privé et les citoyens
          </span>{' '}
          devront tous contribuer pour atteindre cet objectif.
        </Trans>
      </p>
    ),
  },
  {
    slug: 'par-ou-commencer',
    question: <Trans>Par où commencer ?</Trans>,
    answer: (
      <p>
        <Trans>
          Maintenant que vous avez fait votre bilan carbone et que vous avez
          pris conscience de votre empreinte, vous pouvez découvrir{' '}
          <Link href="/actions">l’ensemble des gestes</Link> qui vous
          permettront d’atteindre progressivement l’objectif de 2 tonnes.
        </Trans>
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
            <Trans>
              <strong className="font-black text-secondary-700">
                2 tonnes
              </strong>{' '}
              en 2050 ?
            </Trans>
          }
        />
      </div>
      <div className="hidden lg:block">
        <Title
          tag="h2"
          className=" text-lg lg:text-2xl"
          title={
            <Trans>
              <strong className="font-black text-secondary-700">
                2 tonnes
              </strong>{' '}
              en 2050 ?
            </Trans>
          }
        />
      </div>
      <div
        className={twMerge(
          'lg:block',
          isOpen || isHedgehog ? 'block' : 'hidden'
        )}>
        <p>
          <Trans>
            C’est l’objectif à atteindre pour espérer limiter le réchauffement
            climatique à 2 degrés.
          </Trans>
        </p>
        <TargetChart isQuestionOpen={isQuestionOpen} />
        <TargetQuestions
          setIsQuestionOpen={setIsQuestionOpen}
          questions={questions}
        />
        <div className="flex justify-end">
          <Link className="text-sm" href="/empreinte-climat" target="_blank">
            <Trans>En savoir plus</Trans>{' '}
            <ExternalLinkIcon className="stroke-primary-700" />
          </Link>
        </div>
      </div>
    </>
  )
}
