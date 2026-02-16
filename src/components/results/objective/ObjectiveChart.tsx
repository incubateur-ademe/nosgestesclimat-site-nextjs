'use client'

import Trans from '@/components/translation/trans/TransClient'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

interface Props {
  carbonFootprint: number
}

interface Point {
  year: number
  value: number
  isCurrent?: boolean
}

const POINTS: Point[] = [
  { year: 2030, value: 7000 },
  { year: 2040, value: 4000 },
  { year: 2050, value: 2000 },
]

import { useEffect, useRef, useState } from 'react'

export default function ObjectiveChart({ carbonFootprint }: Props) {
  const { t } = useClientTranslation()
  const locale = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const [arrowRotation, setArrowRotation] = useState(26) // Default fallback

  const currentYear = new Date().getFullYear()

  const allPoints: Point[] = [
    { year: currentYear, value: carbonFootprint, isCurrent: true },
    ...POINTS.filter(({ value }) =>
      carbonFootprint < 7000 ? value !== 7000 : true
    ),
  ]

  // Calculate coordinates
  // Distribute points equally on X axis
  const getCoordinates = (index: number) => {
    // X goes from 10% to 90%
    const scaleMinX = 10
    const scaleMaxX = 60
    const x =
      scaleMinX + (index / (allPoints.length - 1)) * (scaleMaxX - scaleMinX)

    // Y goes from 20% to 80% (straight line)
    // We ignore the value for Y to ensure straight line alignment as requested
    const scaleMinY = 20
    const scaleMaxY = 80

    // Determine Y based on X to follow the slope
    // But since X is linear with index, Y can also be linear with index
    const y =
      scaleMinY + (index / (allPoints.length - 1)) * (scaleMaxY - scaleMinY)

    return { x, y }
  }

  const pointsWithCoords = allPoints.map((p, index) => ({
    ...p,
    ...getCoordinates(index),
  }))
  const firstPoint = pointsWithCoords[0]
  const lastPoint = pointsWithCoords[pointsWithCoords.length - 1]

  // Shorten the line by approx 15px to account for the arrow offset
  // Based on current layout (10->60% X, 20->90% Y)
  // Estimated offsets:
  const shortenX = 1.3
  const shortenY = 2.2

  const shortenedLastPointIndex = pointsWithCoords.length - 1
  const pathPoints = [...pointsWithCoords]
  pathPoints[shortenedLastPointIndex] = {
    ...lastPoint,
    x: lastPoint.x - shortenX,
    y: lastPoint.y - shortenY,
  }

  const pathD = pathPoints.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    return `${acc} L ${p.x} ${p.y}`
  }, '')

  useEffect(() => {
    if (!containerRef.current) return

    const calculateRotation = () => {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()

      // Calculate the visual angle of the line
      // The line goes from (10% x, 20% y) to (60% x, 80% y)
      // dx = 50% of width, dy = 60% of height
      const dx = 0.45 * width
      const dy = 0.6 * height

      if (dx === 0) return

      const angle = (Math.atan2(dy, dx) * 180) / Math.PI
      setArrowRotation(angle)
    }

    calculateRotation()

    const observer = new ResizeObserver(calculateRotation)
    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-primary-100 relative mt-8 h-96 w-full overflow-visible rounded-xl px-8 py-4">
      {/* Chart Area */}
      <div ref={containerRef} className="relative mx-auto h-80 w-full max-w-lg">
        {/* SVG Line */}
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 100 100">
          <motion.path
            d={pathD}
            fill="none"
            stroke="#d40d83"
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </svg>

        {/* Animated Arrow */}
        <motion.div
          className="absolute h-4 w-4"
          style={{
            marginLeft: '-6px', // Center arrow horizontally (12px width / 2)
            marginTop: '-6px', // Center arrow vertically
          }}
          initial={{
            left: `${firstPoint.x}%`,
            top: `${firstPoint.y}%`,
            opacity: 0,
          }}
          whileInView={{
            left: `${lastPoint.x}%`,
            top: `${lastPoint.y}%`,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}>
          <div
            style={{
              transform: `rotate(${arrowRotation}deg) translateX(-16px)`,
            }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 18 18"
              className="overflow-visible">
              <path
                d="M 2 1 L 8 6 L 2 11"
                fill="none"
                stroke="#d40d83"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Points and Labels */}
        {pointsWithCoords.map((p, index) => {
          const isLastPoint = index === pointsWithCoords.length - 1

          const { formattedValue, unit } = formatCarbonFootprint(p.value, {
            locale,
            t,
            shouldUseAbbreviation: !isLastPoint,
          })

          return (
            <div
              key={p.year}
              className="absolute flex flex-col items-center"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: 'translate(-50%, -50%)',
              }}>
              {/* Point Circle */}
              <div className="relative flex items-center justify-center">
                {p.isCurrent && (
                  <motion.div
                    className="bg-secondary-700 absolute rounded-full"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: 1.5,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                )}
                <div
                  className={twMerge(
                    'bg-secondary-700 relative z-10 rounded-full',
                    p.isCurrent ? 'h-5 w-5' : 'h-4 w-4'
                  )}
                />
              </div>

              <div
                className={twMerge(
                  'absolute flex w-max flex-col',
                  'bottom-2 left-5 items-start text-left'
                )}>
                <span className="text-secondary-700 text-xs font-bold md:text-sm">
                  {p.isCurrent ? (
                    <Trans>Vous aujourd'hui</Trans>
                  ) : p.year === 2050 ? (
                    <Trans>Objectif 2050</Trans>
                  ) : (
                    p.year
                  )}
                </span>
                <span className="text-primary-950 text-xl font-black md:text-2xl">
                  {p.year === 2050 ? (
                    <div className="flex flex-col">
                      <span>
                        <Trans>2 tonnes</Trans>
                      </span>
                    </div>
                  ) : (
                    `${formattedValue} ${unit}`
                  )}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-right text-sm italic">
        <Trans i18nKey="results.objective.chart.trajectory">
          Trajectoire proposée par Nos Gestes Climat
        </Trans>
      </p>
    </div>
  )
}
