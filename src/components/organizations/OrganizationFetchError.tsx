import ButtonLink from '@/design-system/inputs/ButtonLink'
import Loader from '@/design-system/layout/Loader'
import { Organization } from '@/types/organizations'
import MaxWidthContent from '../layout/MaxWidthContent'
import Trans from '../translation/Trans'

type Props = {
  organization: Organization
  isError: boolean
}

export default function OrganizationFetchError({
  organization,
  isError,
}: Props) {
  return (
    <>
      {!organization && !isError && <Loader />}

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
