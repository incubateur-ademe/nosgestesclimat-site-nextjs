import Link from '@/components/Link'
import SpeechBubbleIcon from '@/components/icons/SpeechBubbleIcon'
import Trans from '@/components/translation/Trans'

export default function NousContacter() {
  return (
    <section className="mt-12">
      <div className="flex gap-8">
        <SpeechBubbleIcon />

        <div>
          <p className="mb-2">
            <Trans>Vous avez une question ?</Trans>
          </p>
          <Link href="/contact">Contactez-nous</Link>
        </div>
      </div>
    </section>
  )
}
