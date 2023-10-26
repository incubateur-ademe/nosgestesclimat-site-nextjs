import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'

export default function Confirmation() {
  return (
    <Card className="mb-4 items-start border-none bg-grey-100 py-8">
      <div className="text-left; bg-transparent text-left text-2xl font-bold">
        <p>
          <Trans>Votre simulation est sauvegardée !</Trans>{' '}
          <Emoji className="inline-block">✅</Emoji>
        </p>
      </div>
      <p className="mt-4 max-w-lg text-left">
        <Trans>
          Vous allez recevoir un email de notre part sous peu, qui vous
          permettra de la retrouver <strong>à tout moment</strong>.
        </Trans>
      </p>
    </Card>
  )
}
