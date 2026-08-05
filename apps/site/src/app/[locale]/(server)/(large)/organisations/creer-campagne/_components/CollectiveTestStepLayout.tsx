'use client'

import StepsDisplay from '@/components/groups/StepsDisplay'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import Title from '@/design-system/layout/Title'
import type { JSX, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { useCollectiveTestFlow } from './CollectiveTestProvider'
import CloseButton from './CloseButton'

interface Props {
  backHref: string
  title: string | JSX.Element
  children: ReactNode
  titleClassName?: string
  hasSeparator?: boolean
  itemsCenter?: boolean
}

export default function CollectiveTestStepLayout({
  backHref,
  title,
  children,
  titleClassName,
  hasSeparator = true,
  itemsCenter = false,
}: Props) {
  const { stepNumber, totalSteps } = useCollectiveTestFlow()

  return (
    <div className="mt-4 mb-16 md:mt-8">
      <div
        className={twMerge(
          'mb-4 flex flex-row justify-between',
          itemsCenter && 'items-center'
        )}>
        <GoBackLink href={backHref} />
        <CloseButton />
      </div>

      <div className="mb-4 flex flex-col justify-between md:flex-nowrap">
        <StepsDisplay currentStep={stepNumber} totalSteps={totalSteps} />

        <Title
          title={title}
          size="lg"
          className={titleClassName}
          hasSeparator={hasSeparator}
        />

        {children}
      </div>
    </div>
  )
}
