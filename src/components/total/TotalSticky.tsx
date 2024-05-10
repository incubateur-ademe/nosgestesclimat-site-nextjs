import HeadingButtons from '@/components/fin/HeadingButtons'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRule } from '@/publicodes-state'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import ValueChangeDisplay from '../misc/ValueChangeDisplay'
import Trans from '../translation/Trans'

type Props = {
  endPage?: boolean
  buttons?: ('share' | 'save' | 'summary')[]
  toggleQuestionList?: () => void
}
export default function TotalSticky({
  endPage = false,
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

  const [isVisible, setIsVisible] = useState(!endPage)
  const myElementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleScroll = () => {
      if (myElementRef.current) {
        const { top } = myElementRef.current.getBoundingClientRect()
        if (top <= 16) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
    }

    if (endPage) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [endPage])

  return (
    <div
      ref={myElementRef}
      className={twMerge(
        'short:py-2 hidden items-center justify-between rounded-xl border-2 border-primary-50 bg-gray-100 p-4 transition-opacity duration-700 lg:flex',
        isVisible ? 'visible opacity-100' : 'invisible opacity-0'
      )}>
      <div className="relative flex items-center gap-2">
        <strong className="short:text-3xl text-5xl font-black leading-none">
          {formattedValue}
        </strong>
        <div className="font-medium leading-none">
          <span className="mb-0.5 block text-2xl leading-none">{unit}</span>
          <span className="leading block text-xs">
            <Trans>de C0₂e par an</Trans>
          </span>
        </div>
        <ValueChangeDisplay className="absolute bottom-2/3 left-full rounded-xl bg-primary-700 px-4 py-2 text-white" />
      </div>

      <HeadingButtons
        size="sm"
        buttons={buttons}
        toggleQuestionList={toggleQuestionList}
      />
    </div>
  )
}
