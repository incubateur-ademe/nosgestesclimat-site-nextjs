import Trans from '@/components/translation/Trans'

export default function Confirmation() {
  return (
    <div>
      <div className="text-left; bg-transparent text-left text-2xl font-bold">
        <p>
          <Trans>Merci pour votre inscription !</Trans> 🌱
        </p>
      </div>
      <p className="mt-4 text-left">
        <Trans>Vous allez recevoir un email de notre part sous peu.</Trans>
      </p>
    </div>
  )
}
