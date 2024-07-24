import Question from '@/components/form/Question'
import { useRule } from '@/publicodes-state'
import PencilIcon from '../icons/PencilIcon'
import Trans from '../translation/Trans'
import DishesNumberInfo from './plats/DishesNumberInfo'

export default function Plats() {
  const questionRuleName = 'alimentation . plats'
  const { isMissing } = useRule(questionRuleName)

  return (
    <>
      <Question
        question={questionRuleName}
        showInputsLabel={
          <span className="flex items-center">
            <PencilIcon
              className="mr-2 stroke-primary-700"
              width="16"
              height="16"
            />

            <Trans>Détailler mes repas</Trans>
          </span>
        }
      />
      {!isMissing ? <DishesNumberInfo /> : null}
    </>
  )
}
