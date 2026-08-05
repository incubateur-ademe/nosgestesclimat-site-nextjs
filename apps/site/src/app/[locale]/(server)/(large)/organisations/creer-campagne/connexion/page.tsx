import { SIGNIN_MODE } from '@/constants/authentication/modes'
import CollectiveTestAuthView from '../_components/CollectiveTestAuthView'

export default function CollectiveTestConnexionPage() {
  return <CollectiveTestAuthView mode={SIGNIN_MODE} />
}
