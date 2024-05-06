import { useCurrentSimulation, useRule } from '@/publicodes-state'
import { useEffect, useState } from 'react'
import Label from '../form/question/Label'
import MosaicBooleanInput from './transport/MosaicBooleanInput'
import Navigation from './transport/Navigation'
import { useAvion } from './transport/hooks/useAvion'
import { useBus } from './transport/hooks/useBus'
import { useCampingCar } from './transport/hooks/useCampingCar'
import { useCaravane } from './transport/hooks/useCaravane'
import { useDeuxRoues } from './transport/hooks/useDeuxRoues'
import { useFerry } from './transport/hooks/useFerry'
import { useMarche } from './transport/hooks/useMarche'
import { useMetro } from './transport/hooks/useMetro'
import { useOther } from './transport/hooks/useOther'
import { useTrain } from './transport/hooks/useTrain'
import { useVae } from './transport/hooks/useVae'
import { useVan } from './transport/hooks/useVan'
import { useVelo } from './transport/hooks/useVelo'
import { useVoiture } from './transport/hooks/useVoiture'
import { transports } from './transport/transports'

const QUESTION_DOTTED_NAME = 'transport . liste'
/**
 * This component displays a mosaic of transport at the beginning of the simulation
 * It is temporary for split testing. It should not serve as a reference for future components.
 */
export default function Transport() {
  const { label } = useRule(QUESTION_DOTTED_NAME)

  // An object to store the answers of the user for each transport
  const [answers, setAnswers] = useState<Record<string, boolean>>({})

  // We use localStorage to store the answers of the user
  const [isInitialized, setIsInitialized] = useState(false)
  useEffect(() => {
    setAnswers(JSON.parse(localStorage.getItem(QUESTION_DOTTED_NAME) || '{}'))
    setIsInitialized(true)
  }, [])
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(QUESTION_DOTTED_NAME, JSON.stringify(answers))
    }
  }, [answers, isInitialized])

  // A state to know if the user has already answered a question
  const [isPristine, setIsPristine] = useState(true)

  useEffect(() => {
    if (Object.keys(answers).some((key) => answers[key])) {
      setIsPristine(false)
    }
  }, [answers])

  // We use situationKeysToRemove to reset the value of the situation
  // (for questions that are not booleans like km or hours)
  const { updateCurrentSimulation } = useCurrentSimulation()

  // We use a custom hook for each transport. It will set the value of each based on the answers.
  useAvion({ answers, isPristine, updateCurrentSimulation })
  useBus({ answers, isPristine, updateCurrentSimulation })
  useCampingCar({ answers, isPristine, updateCurrentSimulation })
  useCaravane({ answers, isPristine, updateCurrentSimulation })
  useDeuxRoues({ answers, isPristine, updateCurrentSimulation })
  useFerry({ answers, isPristine, updateCurrentSimulation })
  useMetro({ answers, isPristine, updateCurrentSimulation })
  useOther({ answers, isPristine, updateCurrentSimulation })
  useTrain({ answers, isPristine, updateCurrentSimulation })
  useMarche({ answers, isPristine, updateCurrentSimulation })
  useVae({ answers, isPristine, updateCurrentSimulation })
  useVan({ answers, isPristine, updateCurrentSimulation })
  useVelo({ answers, isPristine, updateCurrentSimulation })
  useVoiture({ answers, isPristine, updateCurrentSimulation })

  return (
    <>
      <div className="mb-4">
        <Label question={QUESTION_DOTTED_NAME} label={label} />

        <fieldset className="grid gap-4 md:grid-cols-2">
          {transports.map((transport, index) => (
            <MosaicBooleanInput
              key={transport.key}
              title={transport.title}
              icons={transport.icons}
              value={answers[transport.key]}
              setValue={(value) =>
                setAnswers((prevAnswers) => ({
                  ...prevAnswers,
                  [transport.key]: value,
                }))
              }
              index={index}
            />
          ))}
        </fieldset>
      </div>
      <Navigation question={QUESTION_DOTTED_NAME} isPristine={isPristine} />
    </>
  )
}
