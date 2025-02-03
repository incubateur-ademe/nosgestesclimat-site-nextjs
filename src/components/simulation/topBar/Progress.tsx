import {
  getBackgroundColor,
  getBackgroundLightColor,
} from '@/helpers/getCategoryColorClass'
import { useCurrentSimulation, useForm } from '@/publicodes-state'
import { twMerge } from 'tailwind-merge'

export default function Progress() {
  const { currentCategory } = useForm()

  const { progression } = useCurrentSimulation()

  return (
    <>
      <div
        className={twMerge(
          'absolute bottom-0 left-0 right-0 h-1 transition-transform',
          getBackgroundLightColor(currentCategory)
        )}
      />
      <div
        className={twMerge(
          'absolute bottom-0 left-0 right-0 h-1 origin-left transition-transform',
          getBackgroundColor(currentCategory)
        )}
        style={{ transform: `scaleX(${progression})` }}
      />
    </>
  )
}
