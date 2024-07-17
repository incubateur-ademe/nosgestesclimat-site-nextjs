import { metrics } from '@/constants/metric'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import { twMerge } from 'tailwind-merge'
import TotalStickySlide from './totalSticky/TotalStickySlide'

export default function TotalStickyMobile() {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  const [isVisible, setIsVisible] = useState(false)

  const myElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      console.log('scroll')
      if (myElementRef.current) {
        const { top } = myElementRef.current.getBoundingClientRect()
        console.log(top)
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

  const sliderRef = useRef<any>(null)
  useEffect(() => {
    sliderRef?.current?.slickGoTo(metrics.indexOf(currentMetric))
  }, [currentMetric])

  return (
    <div
      ref={myElementRef}
      className={twMerge(
        'slider-small sticky top-0 z-50 -mx-2 flex items-center justify-between overflow-hidden bg-white bg-opacity-25 pt-2 transition-opacity duration-300 lg:hidden',
        isVisible ? 'visible opacity-100' : 'invisible opacity-0'
      )}>
      <div
        className={twMerge(
          'relative w-full transition-transform duration-500',
          isVisible ? 'translate-y-0' : '-translate-y-full'
        )}>
        <Slider
          ref={sliderRef}
          initialSlide={metrics.indexOf(currentMetric)}
          dots={true}
          infinite={false}
          className="w-full"
          beforeChange={(_, nextSlide) => setCurrentMetric(metrics[nextSlide])}>
          {metrics.map((metric) => (
            <TotalStickySlide key={metric} metric={metric} />
          ))}
        </Slider>
      </div>
    </div>
  )
}
