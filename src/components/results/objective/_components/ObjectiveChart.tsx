'use client'

import Trans from '@/components/translation/trans/TransClient'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { motion, useReducedMotion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { useObjectiveChart } from './_hooks/useObjectiveChart'

interface Props {
  carbonFootprint: number
}

export default function ObjectiveChart({ carbonFootprint }: Props) {
  const { t } = useClientTranslation()
  const locale = useLocale()
  const {
    containerRef,
    firstPoint,
    lastPoint,
    linePath,
    arrowRotation,
    pointsWithCoords,
  } = useObjectiveChart(carbonFootprint)

  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="bg-primary-100 mt-8 h-90 w-full overflow-visible rounded-xl px-8 py-6">
      <div
        ref={containerRef}
        className="relative mx-auto h-72 w-full max-w-10/12 md:max-w-[400px]">
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 100 100">
          <motion.path
            d={linePath}
            fill="none"
            className="stroke-secondary-700"
            strokeWidth="0.8"
            initial={{
              pathLength: shouldReduceMotion ? 1 : 0,
              opacity: shouldReduceMotion ? 1 : 0,
            }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.5,
              ease: 'easeInOut',
            }}
          />
        </svg>

        {/* Animated Arrow */}
        <motion.div
          className="absolute h-4 w-4"
          initial={{
            left: `${shouldReduceMotion ? lastPoint.x : firstPoint.x}%`,
            top: `${shouldReduceMotion ? lastPoint.y : firstPoint.y}%`,
            opacity: shouldReduceMotion ? 1 : 0,
          }}
          whileInView={{
            left: `${lastPoint.x}%`,
            top: `${lastPoint.y}%`,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.5,
            ease: 'easeInOut',
          }}>
          <div
            className="-translate-x-4.5 -translate-y-5 sm:-translate-x-5 sm:-translate-y-4 md:-translate-x-4.5"
            style={{
              transform: `rotate(${arrowRotation}deg)`,
            }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 18 18"
              className="overflow-visible">
              <path
                d="M 2 1 L 8 6 L 2 11"
                fill="none"
                className="stroke-secondary-700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

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
              <div className="relative flex items-center justify-center">
                {p.isCurrent && !shouldReduceMotion && (
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
