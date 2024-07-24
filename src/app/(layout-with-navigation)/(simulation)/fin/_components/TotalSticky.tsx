import { metrics } from '@/constants/metric'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import { twMerge } from 'tailwind-merge'
import DesktopTabNavigation from './metricSlider/DesktopTabNavigation'
import TotalStickySlide from './totalSticky/TotalStickySlide'

export default function TotalSticky() {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

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

  const sliderRef = useRef<Slider>(null)
  useEffect(() => {
    sliderRef?.current?.slickGoTo(metrics.indexOf(currentMetric))
  }, [currentMetric])

  return (
    <div
      ref={myElementRef}
      className={twMerge(
        'slider-small sticky top-0 z-50 -mx-2 flex items-center justify-between overflow-hidden bg-white bg-opacity-25 pt-2 transition-opacity duration-200 lg:bg-opacity-100 lg:pt-0.5',
        isVisible ? 'visible opacity-100' : 'invisible opacity-0'
      )}>
      <div
        className={twMerge(
          'relative w-full transition-transform duration-500',
          isVisible ? 'translate-y-0' : '-translate-y-2/3'
        )}>
        <DesktopTabNavigation sticky />
        <Slider
          ref={sliderRef}
          className="w-full lg:-mt-0.5 lg:rounded-b-xl lg:rounded-tr-xl lg:border-2 lg:border-primary-50 lg:bg-gray-100"
          initialSlide={metrics.indexOf(currentMetric)}
          fade={true}
          infinite={false}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                fade: false,
                dots: true,
              },
            },
          ]}
          beforeChange={(_, nextSlide) => setCurrentMetric(metrics[nextSlide])}>
          {metrics.map((metric) => (
            <TotalStickySlide key={metric} metric={metric} />
          ))}
        </Slider>
      </div>
    </div>
  )
}
