'use client'

import Link from '@/components/Link'
import MessageIcon from '@/components/icons/MessageIcon'
import TransClient from '@/components/translation/trans/TransClient'

export default function NousContacter() {
  return (
    <section className="mt-12 mb-20">
      <div className="flex gap-8">
        <MessageIcon width="50" height="50" className="fill-primary-700" />

        <div className="text-lg">
          <p className="mb-2">
            <TransClient>Vous avez une question ?</TransClient>
          </p>
          <Link href="/contact">Contactez-nous</Link>
        </div>
      </div>
    </section>
  )
}
