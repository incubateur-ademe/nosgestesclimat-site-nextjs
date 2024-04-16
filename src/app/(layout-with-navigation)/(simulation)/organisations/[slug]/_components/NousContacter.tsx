import Link from '@/components/Link'
import MessageIcon from '@/components/icons/MessageIcon'

export default function NousContacter() {
  return (
    <section className="mb-20 mt-12">
      <div className="flex gap-8">
        <MessageIcon width="50" height="50" className="fill-primary-700" />

        <div className="text-lg">
          <p className="mb-2">
            <NGCTrans>Vous avez une question ?</NGCTrans>
          </p>
          <Link href="/contact">Contactez-nous</Link>
        </div>
      </div>
    </section>
  )
}
