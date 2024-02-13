import ButtonLink from '@/design-system/inputs/ButtonLink'
import Loader from '@/design-system/layout/Loader'
import { Organisation } from '@/types/organisations'
import MaxWidthContent from '../layout/MaxWidthContent'
import Trans from '../translation/Trans'

type Props = {
  organisation: Organisation
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
            <Trans>
              Oups, une erreur s'est produite au moment de récupérer vos données
              d'organisation.
            </Trans>
          </p>

          <ButtonLink href="/organisations" className="mt-8">
            <Trans>Revenir à l'accueil</Trans>
          </ButtonLink>
        </MaxWidthContent>
      )}
    </>
  )
}
