import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'

export default function Confirmation() {
  return (
    <Card className="mb-4 max-w-lg bg-grey-100">
      <div className="text-left; bg-transparent text-left text-2xl font-bold">
        <p>
          <Trans>Merci pour votre inscription !</Trans> 🌱
        </p>
      </div>
      <p className="mt-4 text-left">
        <Trans>Vous allez recevoir un email de notre part sous peu.</Trans>
      </p>
    </Card>
  )
}
