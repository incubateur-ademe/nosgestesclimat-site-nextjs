'use client'

import AuthenticateUserForm from '@/components/AuthenticateUserForm'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import InlineLink from '@/design-system/inputs/InlineLink'
import Title from '@/design-system/layout/Title'
import { useCurrentSimulation } from '@/publicodes-state'
import { useRouter } from 'next/navigation'

export default function Email() {
  const { polls } = useCurrentSimulation()
  const pollSlug = polls?.[0]
  const hasContest =
    pollSlug &&
    (process.env.NEXT_PUBLIC_POLL_CONTEST_SLUGS ?? '')
      .split(',')
      .includes(pollSlug)
  const router = useRouter()
  return (
    <>
      <Title
        data-testid="tutoriel-title"
        className="text-lg md:text-2xl"
        title={<Trans>Votre adresse electronique</Trans>}
        subtitle={
          <>
            <Trans>
              Pour conserver vos résultats et les retrouver à l’avenir dans{' '}
              <strong>votre espace personnel</strong>
            </Trans>
            {hasContest ? (
              <span>
                <Trans>Votre e-mail sera utilisé pour le tirage au sort.</Trans>{' '}
                <InlineLink
                  target="_blank"
                  href="/politique-de-confidentialite">
                  <Trans>En savoir plus</Trans>
                </InlineLink>
              </span>
            ) : null}

            <span className="text-secondary-700 ml-2 inline-block font-bold italic">
              <Trans>facultatif</Trans>
            </span>
          </>
        }
      />
      <AuthenticateUserForm
        buttonLabel={'Vérifier mon adresse email'}
        additionnalButton={
          <Button
            color="secondary"
            type="button"
            onClick={() => router.push('/fin')}>
            <Trans>Passer</Trans>
          </Button>
        }
        redirectURL={'/fin'}
      />
    </>
  )
}
