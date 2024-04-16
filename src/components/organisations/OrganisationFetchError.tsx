import ButtonLink from '@/design-system/inputs/ButtonLink'
import Loader from '@/design-system/layout/Loader'
import { Organisation } from '@/types/organisations'
import MaxWidthContent from '../layout/MaxWidthContent'

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
            <NGCTrans>Oups</NGCTrans>
            <NGCTrans>
              , vous avez été déconnecté·e de votre espace organisation,
              reconnectez vous en cliquant sur le bouton ci-dessous.
            </NGCTrans>
          </p>

          <ButtonLink href="/organisations/connexion" className="mt-8">
            <NGCTrans>Me connecter</NGCTrans>
          </ButtonLink>
        </MaxWidthContent>
      )}
    </>
  )
}
