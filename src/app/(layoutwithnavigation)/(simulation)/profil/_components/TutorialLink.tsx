'use client'

import TransClient from '@/components/translation/TransClient'
import ButtonLink from '@/design-system/inputs/ButtonLink'

export default function TutorialLink({ className = '' }) {
  return (
    <ButtonLink color="text" href="/tutoriel" className={className}>
      <span role="img" aria-label="nerd emoji" className="inline-block mr-2">
        🤓
      </span>
      <span>
        {' '}
        <TransClient>Revoir le tutoriel</TransClient>
      </span>
    </ButtonLink>
  )
}
