import ButtonLink from '@/design-system/inputs/ButtonLink'
import Loader from '@/design-system/layout/Loader'
import { Organisation } from '@/types/organisations'
import MaxWidthContent from '../layout/MaxWidthContent'
import Trans from '../translation/Trans'

type Props = {
  organisation: Organisation | undefined
  isError: boolean
}

export default function OrganisationFetchError({
  organisation,
  isError,
}: Props) {
  return (
    <>
      {!organisation && !isError && <Loader />}

      {isError && (
        <MaxWidthContent>
          <p>
            <Trans>Oups</Trans>
            <Trans>
              , vous avez été déconnecté·e de votre espace organisation, ou vous
              cherchez à y accéder depuis un nouveau navigateur.
            </Trans>
          </p>

          <p>
            <Trans>
              Reconnectez vous en cliquant sur le bouton ci-dessous.
            </Trans>
          </p>

          <ButtonLink href="/organisations/connexion" className="mt-8">
            <Trans>Me connecter</Trans>
          </ButtonLink>
        </MaxWidthContent>
      )}
    </>
  )
}
