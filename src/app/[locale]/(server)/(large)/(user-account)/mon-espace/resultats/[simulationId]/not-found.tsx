import Trans from '@/components/translation/trans/TransServer'
import { MON_ESPACE_PATH } from '@/constants/urls/paths'
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
      <Trans i18nKey="pages.result.notfound" locale={locale}>
        <Title tag="h1">Impossible de retrouver ces résultats</Title>
        <p>
          Cela signifie qu'ils n'existent pas, ou qu'ils ne sont pas reliés à
          votre e-mail.
        </p>
        <p>
          Dans ce dernier cas, vous pouvez essayer de vous re-connecter avec
          d'autres identifiants.
        </p>
        <ButtonLink href={MON_ESPACE_PATH}>Retour à mon espace</ButtonLink>
      </Trans>
    </ErrorPage>
  )
}
