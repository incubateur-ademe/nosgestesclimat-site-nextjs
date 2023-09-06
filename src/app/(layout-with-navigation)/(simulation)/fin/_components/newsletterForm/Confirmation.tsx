import TransClient from '@/components/translation/TransClient'

export default function Confirmation() {
  return (
    <div>
      <div className="text-2xl text-left font-bold bg-transparent text-left;">
        <p>
          <TransClient>Merci pour votre inscription !</TransClient> 🌱
        </p>
      </div>
      <p className="text-left mt-4">
        <TransClient>
          Vous allez recevoir un email de notre part sous peu.
        </TransClient>
      </p>
    </div>
  )
}
