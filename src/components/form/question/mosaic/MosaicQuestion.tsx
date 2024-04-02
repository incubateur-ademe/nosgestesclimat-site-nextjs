import { useFetchSimulation } from '@/hooks/simulation/useFetchSimulation'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useRule, useUser } from '@/publicodes-state'
import MosaicBooleanInput from './mosaicQuestion/MosaicBooleanInput'
import MosaicNumberInput from './mosaicQuestion/MosaicNumberInput'

type Props = {
  question: string
  parentMosaic: string
  index: number
}

export default function MosaicQuestion({
  question,
  parentMosaic,
  index,
  ...props
}: Props) {
  const { type, parent, setValue } = useRule(question)

  const { title, icons, description } = useRule(parent)

  const { resetMosaicChildren } = useRule(parentMosaic)

  const { getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const { simulation: simulationSaved } = useFetchSimulation({
    simulationId: currentSimulation?.id ?? '',
  })

  const { saveSimulationNotAsync } = useSaveSimulation()

  function handleUpdateSavedSimulation() {
    if (
      currentSimulation &&
      currentSimulation?.progression === 1 &&
      !!simulationSaved
    ) {
      saveSimulationNotAsync({
        simulation: currentSimulation,
        shouldSendSimulationEmail: false,
      })
    }
  }

  return (
    <>
      {type === 'number' && (
        <MosaicNumberInput
          question={question}
          title={title}
          icons={icons}
          description={description}
          setValue={async (value) => {
            await setValue(value < 0 ? 0 : value, parentMosaic)
            resetMosaicChildren(question)
            handleUpdateSavedSimulation()
          }}
          parentMosaic={parentMosaic}
          index={index}
          {...props}
        />
      )}
      {type === 'boolean' && (
        <MosaicBooleanInput
          question={question}
          title={title}
          icons={icons}
          description={description}
          setValue={async (value) => {
            await setValue(value, parentMosaic)
            resetMosaicChildren(question)
            handleUpdateSavedSimulation()
          }}
          index={index}
          {...props}
        />
      )}
    </>
  )
}
