import {
  getBackgroundColor,
  getBackgroundLightColor,
} from '@/helpers/getCategoryColorClass'
import { useCurrentSimulation, useFormState } from '@/publicodes-state'
import { twMerge } from 'tailwind-merge'

export default function Progress() {
  const { currentCategory } = useFormState()

  const { progression } = useCurrentSimulation()

  return (
    <>
      <div
        className={twMerge(
          'absolute right-0 bottom-0 left-0 h-1 transition-transform',
          getBackgroundLightColor(currentCategory)
        )}
      />
      <div
        className={twMerge(
          'absolute right-0 bottom-0 left-0 h-1 origin-left transition-transform',
          getBackgroundColor(currentCategory)
        )}
        style={{ transform: `scaleX(${progression})` }}
      />
    </>
  )
}
