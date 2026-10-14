import { ACTIONS_MY_PLAN_PATH, MON_ESPACE_PATH } from '@/constants/urls/paths'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { match } from 'ts-pattern'
import type { AuthorizedFromSearchParamsValues } from '../../_constants/search-params'

export async function getLoginProps(
  from?: AuthorizedFromSearchParamsValues
): Promise<{
  labels: {
    title: string
    buttonLabel: string
  }
  redirectPathname: string
}> {
  const { t } = await getServerTranslation()

  return match(from)
    .with('build-action-plan', () => ({
      labels: {
        title: t(
          'login.actionPlan.title',
          'Connectez-vous pour accéder à votre plan d’action'
        ),
        buttonLabel: t(
          'login.actionPlan.buttonLabel',
          'Me connecter et voir mon plan d’action'
        ),
      },
      redirectPathname: `${ACTIONS_MY_PLAN_PATH}?from=${from}`,
    }))
    .otherwise(() => ({
      labels: {
        title: t(
          'login.login.title',
          'Accédez à votre espace Nos Gestes Climat'
        ),
        buttonLabel: t('signIn.emailForm.buttonLabel', 'Accéder à mon espace'),
      },
      redirectPathname: MON_ESPACE_PATH,
    }))
}
