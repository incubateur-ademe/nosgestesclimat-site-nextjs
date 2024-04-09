import Link from '@/components/Link'
import MessageIcon from '@/components/icons/MessageIcon'
import Trans from '@/components/translation/Trans'

export default function NousContacter() {
  return (
    <section className="mb-20 mt-12">
      <div className="flex gap-8">
        <MessageIcon width="50" height="50" className="fill-primary-700" />

        <div className="text-lg">
          <p className="mb-2">
            <Trans>Vous avez une question ?</Trans>
          </p>
          <Link href="/contact">Contactez-nous</Link>
        </div>
      </div>
    </section>
  )
}
