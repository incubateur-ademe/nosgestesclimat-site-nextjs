'use client'

import CloseIcon from '@/components/icons/Close'
import DownArrow from '@/components/icons/DownArrow'
import { carboneMetric } from '@/constants/model/metric'
import { endToggleTargetBlock } from '@/constants/tracking/pages/end'
import Button from '@/design-system/buttons/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { trackEvent } from '@/utils/analytics/trackEvent'
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

  const { t } = useClientTranslation()

  return (
    <div className="relative">
      <Hedgehog setIsHedgehog={setIsHedgehog} />
      <div className="border-primary-50 short:py-2 relative rounded-xl border-2 bg-gray-100 px-4 py-6">
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
          'absolute top-4 right-4 h-12 w-12 p-0! lg:hidden',
          isHedgehog ? 'block!' : ''
        )}
        aria-label={isOpen || isHedgehog ? t('Fermer') : t('Ouvrir')}
        onClick={() => {
          setIsOpen((prevIsOpen) => !prevIsOpen)
          setIsHedgehog(false)
          trackEvent(endToggleTargetBlock)
        }}>
        {isOpen || isHedgehog ? (
          <CloseIcon className="fill-primary-700 h-7 w-7" />
        ) : (
          <DownArrow className="h-7 w-7 fill-white" />
        )}
      </Button>
    </div>
  )
}
