'use client'

import Link from '@/components/Link'
import GlassesIcon from '@/components/icons/GlassesIcon'
import Trans from '@/components/translation/Trans'

export default function TutorialLink() {
  return (
    <Link
      href="/tutoriel"
      className="flex py-2 align-baseline font-bold no-underline hover:underline">
      <GlassesIcon className="mr-2 fill-primary-700" />
      <span>
        <Trans>Revoir le tutoriel</Trans>
      </span>
    </Link>
  )
}
