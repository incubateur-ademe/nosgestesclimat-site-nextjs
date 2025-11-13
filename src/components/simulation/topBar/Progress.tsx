import {
  getBackgroundDarkColor,
  getBackgroundLightColor,
} from '@/helpers/getCategoryColorClass'
import { useFormState } from '@/publicodes-state'
import { twMerge } from 'tailwind-merge'

export default function Progress() {
  const { currentQuestion, relevantQuestions, currentCategory } = useFormState()

  const index = relevantQuestions.findIndex(
    (question) => question === currentQuestion
  )

  const currentProgression = index === -1 ? 0 : index / relevantQuestions.length

  // Calculer le pourcentage pour l'accessibilité
  const percentage = Math.round(currentProgression * 100)

  return (
    <div
      role="progressbar"
      aria-label="Progression de la simulation"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${percentage}% complété`}
      className="absolute right-0 bottom-0 left-0 h-1">
      {/* Barre de fond */}
      <div
        className={twMerge(
          'absolute right-0 bottom-0 left-0 h-1 transition-transform',
          getBackgroundLightColor(currentCategory)
        )}
        aria-hidden="true"
      />
      {/* Barre de progression */}
      <div
        className={twMerge(
          'absolute right-0 bottom-0 left-0 h-1 origin-left transition-transform',
          getBackgroundDarkColor(currentCategory)
        )}
        style={{ transform: `scaleX(${currentProgression})` }}
        aria-hidden="true"
      />
    </div>
  )
}
