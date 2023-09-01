import { useForm } from '@/publicodes-state'
import { useEffect } from 'react'
import Form from '../../../simulateur/[...dottedName]/_components/Form'

export default function ActionConversation({
  dottedName,
}: {
  dottedName: string
}) {
  const { remainingQuestions } = useForm()
  // const configSet = useSelector((state: AppState) => state.simulation?.config)

  // TODO here we need to apply a rustine to accommodate for this issue
  // https://github.com/betagouv/mon-entreprise/issues/1316#issuecomment-758833973
  // to be continued...
  /*
	const config = {
		objectifs: [dottedName],
		situation: { ...(configSet?.situation ?? {}) },
		questions: questionConfig,
	}
  */

  useEffect(() => {
    // TODO: handle this thing
    /*
    dispatch(setSimulationConfig(config))
    */
  }, [dottedName])
  /*
  if (!configSet) {
    return null
  }
  */

  return remainingQuestions.length > 0 ? <Form /> : null
}
