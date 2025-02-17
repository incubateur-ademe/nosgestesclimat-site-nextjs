'use client'

import ButtonLink from '@/design-system/inputs/ButtonLink'
import Loader from '@/design-system/layout/Loader'
import type { Organisation } from '@/types/organisations'
import MaxWidthContent from '../layout/MaxWidthContent'
import TransClient from '../translation/trans/TransClient'

type Props = { organisation: Organisation | undefined; isError: boolean }

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
            <TransClient>Oups</TransClient>
            <TransClient>
              , vous avez été déconnecté·e de votre espace organisation, ou vous
              cherchez à y accéder depuis un nouveau navigateur.
            </TransClient>
          </p>

          <p>
            <TransClient>
              Reconnectez vous en cliquant sur le bouton ci-dessous.
            </TransClient>
          </p>

          <ButtonLink href="/organisations/connexion" className="mt-8">
            <TransClient>Me connecter</TransClient>
          </ButtonLink>
        </MaxWidthContent>
      )}
    </>
  )
}
