import Form from '@/app/(layout-with-navigation)/(simulation)/simulateur/[root]/_components/Form'
import { useEffect } from 'react'

export default function ActionConversation({
  dottedName,
}: {
  dottedName: string
}) {
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

  return <Form />
}
