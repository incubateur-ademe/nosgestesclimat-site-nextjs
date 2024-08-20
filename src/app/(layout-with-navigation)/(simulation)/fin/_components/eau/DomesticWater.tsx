import CloseIcon from '@/components/icons/Close'
import DownArrow from '@/components/icons/DownArrow'
import Trans from '@/components/translation/Trans'
import { endClickDomesticWater } from '@/constants/tracking/pages/end'
import Button from '@/design-system/inputs/Button'
import Title from '@/design-system/layout/Title'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import DomesticWaterContent from './domesticWater/DomesticWaterContent'

export default function DomesticWater() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <div className="relative rounded-xl border-2 border-primary-50 bg-gray-100 px-4 py-6">
        <div className={isOpen ? '' : '-mb-8'}>
          <Title
            tag="h2"
            hasSeparator={isOpen}
            className="pr-16 text-lg md:pr-0 lg:text-2xl">
            <Trans>
              Et l'eau de{' '}
              <strong className="text-secondary-700">ma douche</strong> dans
              tout ça ?
            </Trans>
          </Title>
        </div>
        <div
          className={twMerge(
            'flex-col items-start',
            isOpen ? 'flex' : 'hidden'
          )}>
          <DomesticWaterContent />
        </div>
      </div>
      <Button
        color={isOpen ? 'text' : 'primary'}
        className="absolute right-4 top-4 h-12 w-12 !p-0"
        onClick={() => {
          trackEvent(endClickDomesticWater)
          setIsOpen((prevIsOpen) => !prevIsOpen)
        }}>
        {isOpen ? (
          <CloseIcon className="h-7 w-7 fill-primary-700" />
        ) : (
          <DownArrow className="h-7 w-7 fill-white" />
        )}
      </Button>
    </div>
  )
}
