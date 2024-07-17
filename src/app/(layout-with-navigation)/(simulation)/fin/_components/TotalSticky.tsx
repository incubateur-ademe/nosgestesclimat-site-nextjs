import { metrics } from '@/constants/metric'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import { twMerge } from 'tailwind-merge'
import TotalStickySlide from './totalSticky/TotalStickySlide'

export default function TotalSticky() {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

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

  const sliderRef = useRef<any>(null)
  useEffect(() => {
    sliderRef?.current?.slickGoTo(metrics.indexOf(currentMetric))
  }, [currentMetric])

  return (
    <div
      ref={myElementRef}
      className={twMerge(
        'slider-small hidden overflow-hidden transition-opacity duration-700 lg:block',
        isVisible ? 'visible opacity-100' : 'invisible opacity-0'
      )}>
      <Slider
        ref={sliderRef}
        initialSlide={metrics.indexOf(currentMetric)}
        dots={true}
        infinite={false}
        className="mx-auto w-full lg:max-w-3xl"
        beforeChange={(_, nextSlide) => setCurrentMetric(metrics[nextSlide])}>
        {metrics.map((metric) => (
          <TotalStickySlide key={metric} metric={metric} />
        ))}
      </Slider>
    </div>
  )
}
