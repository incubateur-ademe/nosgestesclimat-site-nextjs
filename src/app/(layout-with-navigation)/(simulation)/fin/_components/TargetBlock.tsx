'use client'

import Link from '@/components/Link'
import CloseIcon from '@/components/icons/Close'
import DownArrow from '@/components/icons/DownArrow'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Title from '@/design-system/layout/Title'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Hedgehog from './targetBlock/Hedgehog'
import TargetChart from './targetBlock/TargetChart'
import TargetQuestions from './targetBlock/TargetQuestions'

export default function TargetBlock() {
  const [isOpen, setIsOpen] = useState(false)

  const [isHedgehog, setIsHedgehog] = useState(false)
  return (
    <div className="relative">
      <Hedgehog setIsHedgehog={setIsHedgehog} />
      <div className="short:py-2 relative rounded-xl border-2 border-primary-50 bg-gray-100 px-4 py-6">
        {isHedgehog ? (
          <>
            <Title
              tag="h2"
              className="text-lg lg:text-2xl"
              title={
                <Trans>
                  <strong className="font-black text-secondary-700">
                    Hérissons
                  </strong>{' '}
                  en danger ?
                </Trans>
              }
            />
            <p>
              <Trans>
                Les hérissons des campagnes et des jardins de France subissent
                de plein fouet le réchauffement climatique.
              </Trans>
            </p>
            <p>
              <Trans>
                La hausse des températures perturbe leur cycle de reproduction,
                les oblige à se mettre en danger pour trouver de l'eau et durçit
                les sols dans lesquels ils trouvent de quoi se nourrir.
              </Trans>
            </p>
            <div className="flex justify-end">
              <Link
                className="text-sm"
                target="_blank"
                href="https://information.tv5monde.com/international/france-les-herissons-en-danger-dextinction-708196">
                En savoir plus
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={isOpen ? '' : '-mb-8'}>
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
              <TargetChart />
              <TargetQuestions />
              <div className="flex justify-end">
                <Link className="text-sm" href="/empreinte-carbone">
                  En savoir plus
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
