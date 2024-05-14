import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRule } from '@/publicodes-state'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import HeadingButtons from './heading/HeadingButtons'

export default function TotalSticky() {
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
        if (top <= 16) {
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
        'short:py-2 hidden items-center justify-between rounded-xl border-2 border-primary-50 bg-gray-100 p-4 transition-opacity duration-700 lg:flex',
        isVisible ? 'visible opacity-100' : 'invisible opacity-0'
      )}>
      <div>
        <strong className="short:text-3xl text-5xl font-black leading-none">
          {formattedValue}
        </strong>
        <span className="text-3xl font-medium"> {unit}</span>
      </div>
      <HeadingButtons size="sm" endPage />
    </div>
  )
}
