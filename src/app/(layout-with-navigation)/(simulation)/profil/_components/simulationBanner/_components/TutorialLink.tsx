'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'

export default function TutorialLink({ className = '' }) {
  return (
    <ButtonLink color="text" href="/tutoriel" className={className}>
      <span role="img" aria-label="nerd emoji" className="mr-2 inline-block">
        🤓
      </span>
      <span>
        {' '}
        <Trans>Revoir le tutoriel</Trans>
      </span>
    </ButtonLink>
  )
}
