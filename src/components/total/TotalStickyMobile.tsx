import HeadingButtons from '@/components/fin/HeadingButtons'
import ChevronRight from '@/design-system/icons/ChevronRight'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRule } from '@/publicodes-state'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import ValueChangeDisplay from '../misc/ValueChangeDisplay'
import Trans from '../translation/Trans'
import Progress from './_components/Progress'

type Props = {
  isEndPage?: boolean
  buttons?: ('share' | 'save' | 'summary')[]
  toggleQuestionList?: () => void
}

export default function TotalStickyMobile({
  isEndPage = false,
  buttons,
  toggleQuestionList,
}: Props) {
  const locale = useLocale()
  const { t } = useClientTranslation()

  const { numericValue } = useRule('bilan')

  const { formattedValue, unit } = formatCarbonFootprint(numericValue, {
    t,
    locale,
  })

  const [isVisible, setIsVisible] = useState(!isEndPage)

  const myElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (myElementRef.current) {
        const { top } = myElementRef.current.getBoundingClientRect()
        if (top <= 0) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
    }

    if (isEndPage) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isEndPage])

  return (
    <div
      ref={myElementRef}
      className={twMerge(
        'sticky top-0 z-50 -mx-4 flex items-center justify-between border-b-2 border-gray-200 bg-white px-4 py-3 transition-opacity duration-300 lg:hidden',
        isVisible ? 'visible opacity-100' : 'invisible opacity-0'
      )}>
      {!isEndPage && <Progress />}
      <div className="flex items-center gap-3">
        {!isEndPage && (
          <ButtonLink color="text" href="/" className="p-0">
            <ChevronRight className="h-6 w-auto rotate-180" />
          </ButtonLink>
        )}

        <div className="relative flex items-center gap-2">
          <strong className="text-4xl font-black leading-none">
            {formattedValue}
          </strong>
          <div className="font-medium leading-none">
            <span className="block text-lg leading-none">{unit}</span>
            <span className="leading block text-xs">
              <Trans>de C0₂e par an</Trans>
            </span>
          </div>
          <ValueChangeDisplay className="absolute left-1/2 top-2/3 " />
        </div>
      </div>
      <HeadingButtons
        size="sm"
        buttons={buttons}
        toggleQuestionList={toggleQuestionList}
      />
    </div>
  )
}
