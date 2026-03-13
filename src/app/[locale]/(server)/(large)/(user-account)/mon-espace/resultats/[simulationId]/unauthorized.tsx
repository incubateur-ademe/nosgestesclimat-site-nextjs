import Trans from '@/components/translation/trans/TransServer'
import { CONNEXION_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Title from '@/design-system/layout/Title'
import { headers } from 'next/headers'
import ErrorPage from './_components/ErrorPage'

export default async function Unauthorized() {
  // Special convention files like unauthorized.tsx do not receive route params.
  // We extract the locale by parsing the URL pathname from the request headers.
  // Next.JS = 🤮
  const headersList = await headers()
  const locale = headersList.get('x-next-i18n-router-locale')!
  return (
    <ErrorPage locale={locale}>
      <Trans i18nKey="pages.result.unauthorized" locale={locale}>
        <Title tag="h1">Ces résultats sont protégés</Title>
        <p>
          Pour y accéder, vous devez vous connectez avec le même email que celui
          utilisé lors de leur sauvegarde.{' '}
        </p>
        <ButtonLink href={CONNEXION_PATH}>Me connecter</ButtonLink>
      </Trans>
    </ErrorPage>
  )
}
