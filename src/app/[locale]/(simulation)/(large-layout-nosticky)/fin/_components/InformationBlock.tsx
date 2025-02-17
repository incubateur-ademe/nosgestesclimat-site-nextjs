'use client'

import CloseIcon from '@/components/icons/Close'
import DownArrow from '@/components/icons/DownArrow'
import { carboneMetric } from '@/constants/metric'
import { endToggleTargetBlock } from '@/constants/tracking/pages/end'
import Button from '@/design-system/inputs/Button'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import CarboneTargetContent from './informationBlock/CarboneTargetContent'
import Hedgehog from './informationBlock/Hedgehog'
import HedgehogAwareness from './informationBlock/HedgehogAwareness'
import WaterFootprintContent from './informationBlock/WaterFootprintContent'

export default function InformationBlock() {
  const [isOpen, setIsOpen] = useState(false)

  const [isHedgehog, setIsHedgehog] = useState(false)

  const { currentMetric } = useCurrentMetric()
  return (
    <div className="relative">
      <Hedgehog setIsHedgehog={setIsHedgehog} />
      <div className="relative rounded-xl border-2 border-primary-50 bg-gray-100 px-4 py-6 short:py-2">
        {isHedgehog ? (
          <HedgehogAwareness />
        ) : currentMetric === carboneMetric ? (
          <CarboneTargetContent isOpen={isOpen} isHedgehog={isHedgehog} />
        ) : (
          <WaterFootprintContent isOpen={isOpen} isHedgehog={isHedgehog} />
        )}
      </div>
      <Button
        color={isOpen || isHedgehog ? 'text' : 'primary'}
        className={twMerge(
          'absolute right-4 top-4 h-12 w-12 !p-0 lg:hidden',
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
