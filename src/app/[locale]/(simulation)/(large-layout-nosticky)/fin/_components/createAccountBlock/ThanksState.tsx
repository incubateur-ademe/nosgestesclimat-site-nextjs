import Trans from '@/components/translation/trans/TransClient'
import Emoji from '@/design-system/utils/Emoji'

export default function ThanksState() {
  return (
    <h2 className="mb-0! text-lg font-bold">
      <Emoji>✅</Emoji> 
      <Trans>Votre retour a été pris en compte, merci !</Trans>
    </h2>
  )
}
