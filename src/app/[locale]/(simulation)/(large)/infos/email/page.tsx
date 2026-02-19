'use client'

import DefaultErrorAlert from '@/components/error/DefaultErrorAlert'
import Trans from '@/components/translation/trans/TransClient'
import { EMAIL_PAGE } from '@/constants/organisations/infosPages'
import EmailInput from '@/design-system/inputs/EmailInput'
import InlineLink from '@/design-system/inputs/InlineLink'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import Title from '@/design-system/layout/Title'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { isEmailValid } from '@/utils/isEmailValid'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm as useReactHookForm } from 'react-hook-form'
import Navigation from '../_components/Navigation'

interface Inputs {
  email: string
}

export default function Email() {
  const searchParams = useSearchParams()
  const fixedEmail = searchParams.get('fixedemail') ? true : false

  const { user, updateEmail } = useUser()

  const { polls } = useCurrentSimulation()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useReactHookForm<Inputs>({
    defaultValues: {
      email: user?.email || user?.organisation?.administratorEmail || '',
    },
  })

  const { t } = useClientTranslation()

  const router = useRouter()

  const { getLinkToNextInfosPage, getLinkToPrevInfosPage } = useInfosPage()

  const { saveSimulation } = useSaveSimulation()

  const currentSimulation = useCurrentSimulation()

  const pollSlug = polls ? polls[polls.length - 1] : undefined

  const {
    data: poll,
    isError,
    isLoading,
  } = useFetchPublicPoll({
    enabled: !!pollSlug,
    pollIdOrSlug: pollSlug,
  })

  const onSubmit = ({ email }: Inputs) => {
    const linkToNextPage = getLinkToNextInfosPage({ curPage: EMAIL_PAGE })

    // If email is not valid
    if (!isEmailValid(email)) {
      setError('email', {
        type: 'validate',
        message: t(
          'Le format de l’adresse electronique saisie n’est pas valide. Le format attendu est nom@exemple.org'
        ),
      })
      return
    }

    // If email is valid
    if (email) {
      updateEmail(email)
    }

    try {
      // In any case save simulation as user is at end of poll userflow
      saveSimulation({
        simulation: currentSimulation,
      })

      // Go to next page
      router.push(linkToNextPage)
    } catch {
      setError('email', {
        type: 'validate',
        message: t(
          "Une erreur s'est produite au moment de sauvegarder vos données. Veuillez réessayer dans quelques instants."
        ),
      })
    }
  }

  return (
    <form>
      <Title
        data-testid="tutoriel-title"
        className="text-lg md:text-2xl"
        title={<Trans>Votre adresse electronique</Trans>}
        subtitle={
          <>
            {pollSlug &&
            process.env.NEXT_PUBLIC_POLL_CONTEST_SLUGS?.split(',') &&
            process.env.NEXT_PUBLIC_POLL_CONTEST_SLUGS.includes(pollSlug) ? (
              <span>
                <Trans>Votre e-mail sera utilisé pour le tirage au sort.</Trans>{' '}
                <InlineLink
                  target="_blank"
                  href="/politique-de-confidentialite">
                  <Trans>En savoir plus</Trans>
                </InlineLink>
              </span>
            ) : (
              <Trans>
                Pour conserver vos résultats et les retrouver à l’avenir
              </Trans>
            )}

            {!fixedEmail ? (
              <span className="text-secondary-700 ml-2 inline-block font-bold italic">
                <Trans>facultatif</Trans>
              </span>
            ) : null}
          </>
        }
      />

      {isError && <DefaultErrorAlert className="mb-6" />}

      {isLoading && <BlockSkeleton />}

      {poll && (
        <>
          <EmailInput
            readOnly={fixedEmail}
            value={user?.email || user?.organisation?.administratorEmail || ''}
            error={errors?.email?.message}
            {...register('email')}
          />

          <Navigation
            linkToPrev={getLinkToPrevInfosPage({ curPage: EMAIL_PAGE })}
            handleSubmit={handleSubmit(onSubmit)}
            submitDisabled={!getLinkToNextInfosPage({ curPage: EMAIL_PAGE })}
          />
        </>
      )}
    </form>
  )
}
