import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ExternalLinkIcon from '@/design-system/icons/ExternalLinkIcon'
import Title from '@/design-system/layout/Title'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import TargetChart from './carboneTargetContent/TargetChart'
import TargetQuestions from './carboneTargetContent/TargetQuestions'

type Props = {
  isOpen: boolean
  isHedgehog: boolean
}
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
        <TargetQuestions setIsQuestionOpen={setIsQuestionOpen} />
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
