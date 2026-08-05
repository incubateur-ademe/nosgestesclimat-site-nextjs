import { SIGNUP_MODE } from '@/constants/authentication/modes'
import CollectiveTestAuthView from '../_components/CollectiveTestAuthView'

export default function CollectiveTestInscriptionPage() {
  return <CollectiveTestAuthView mode={SIGNUP_MODE} />
}
