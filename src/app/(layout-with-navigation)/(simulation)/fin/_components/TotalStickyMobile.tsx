import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRule } from '@/publicodes-state'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import HeadingButtons from './heading/HeadingButtons'

export default function TotalStickyMobile() {
  const locale = useLocale()
  const { t } = useClientTranslation()

  const { numericValue } = useRule('bilan')

  const { formattedValue, unit } = formatCarbonFootprint(numericValue, {
    t,
    locale,
  })

  const [isVisible, setIsVisible] = useState(false)

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

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      ref={myElementRef}
      className={twMerge(
        'sticky top-0 z-50 -mx-4 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 transition-opacity duration-300 lg:hidden',
        isVisible ? 'visible opacity-100' : 'invisible opacity-0'
      )}>
      <div>
        <strong className="text-4xl font-black leading-none">
          {formattedValue}
        </strong>{' '}
        <span className="text-3xl font-medium">{unit}</span>
      </div>
      <HeadingButtons size="sm" endPage />
    </div>
  )
}
