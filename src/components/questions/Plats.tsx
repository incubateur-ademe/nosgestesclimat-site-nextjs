import Question from '@/components/form/Question'
import { useRule } from '@/publicodes-state'
import DishesNumberInfo from './plats/DishesNumberInfo'

export default function Plats() {
  const questionRuleName = 'alimentation . plats'
  const { isMissing } = useRule(questionRuleName)

  console.log('isMissing', isMissing)
  return (
    <>
      <Question question={questionRuleName} />
      {!isMissing ? <DishesNumberInfo /> : null}
    </>
  )
}
