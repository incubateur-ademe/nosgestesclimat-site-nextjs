'use client'

import Link from '@/components/Link'
import CloseIcon from '@/components/icons/Close'
import DownArrow from '@/components/icons/DownArrow'
import Trans from '@/components/translation/Trans'
import { endToggleTargetBlock } from '@/constants/tracking/pages/end'
import ExternalLinkIcon from '@/design-system/icons/ExternalLinkIcon'
import Button from '@/design-system/inputs/Button'
import Title from '@/design-system/layout/Title'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Hedgehog from './targetBlock/Hedgehog'
import HedgehogAwareness from './targetBlock/HedgehogAwareness'
import TargetChart from './targetBlock/TargetChart'
import TargetQuestions from './targetBlock/TargetQuestions'

export default function TargetBlock() {
  const [isOpen, setIsOpen] = useState(false)

  const [isHedgehog, setIsHedgehog] = useState(false)

  const [isQuestionOpen, setIsQuestionOpen] = useState(false)

  return (
    <div className="relative">
      <Hedgehog setIsHedgehog={setIsHedgehog} />
      <div className="relative rounded-xl border-2 border-primary-50 bg-gray-100 px-4 py-6 short:py-2">
        {isHedgehog ? (
          <HedgehogAwareness />
        ) : (
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
                  C’est l’objectif à atteindre pour espérer limiter le
                  réchauffement climatique à 2 degrés.
                </Trans>
              </p>
              <TargetChart isQuestionOpen={isQuestionOpen} />
              <TargetQuestions setIsQuestionOpen={setIsQuestionOpen} />
              <div className="flex justify-end">
                <Link
                  className="text-sm"
                  href="/empreinte-climat"
                  target="_blank">
                  <Trans>En savoir plus</Trans>{' '}
                  <ExternalLinkIcon className="stroke-primary-700" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <Button
        color={isOpen || isHedgehog ? 'text' : 'primary'}
        className={twMerge(
          'absolute right-4 top-4 h-12 w-12 p-0 lg:hidden',
          isHedgehog ? '!block' : ''
        )}
        onClick={() => {
          setIsOpen((prevIsOpen) => !prevIsOpen)
          setIsHedgehog(false)
          trackEvent(endToggleTargetBlock)
        }}>
        {isOpen || isHedgehog ? (
          <CloseIcon className="h-7 w-7 fill-primary-700" />
        ) : (
          <DownArrow className="h-7 w-7 fill-white" />
        )}
      </Button>
    </div>
  )
}
