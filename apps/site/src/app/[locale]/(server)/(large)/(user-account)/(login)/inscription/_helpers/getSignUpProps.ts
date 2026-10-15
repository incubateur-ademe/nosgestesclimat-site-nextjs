import { SHOW_WELCOME_BANNER_QUERY_PARAM } from '@/constants/urls/params'
import { ACTIONS_MY_PLAN_PATH, MON_ESPACE_PATH } from '@/constants/urls/paths'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { match } from 'ts-pattern'
import type { AuthorizedFromSearchParamsValues } from '../../_constants/search-params'

export async function getSignupProps(
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
          'login.actionPlan.signUp.title',
          'Créez votre espace pour accéder à votre plan d’action'
        ),
        buttonLabel: t(
          'login.actionPlan.signUp.buttonLabel',
          'M’inscrire et voir mon plan d’action'
        ),
      },
      redirectPathname: ACTIONS_MY_PLAN_PATH,
    }))
    .otherwise(() => ({
      labels: {
        title: t(
          'login.default.title',
          'Accédez à votre espace Nos Gestes Climat'
        ),
        buttonLabel: t('signUp.button.label', "M'inscrire"),
      },
      redirectPathname: `${MON_ESPACE_PATH}?${SHOW_WELCOME_BANNER_QUERY_PARAM}=true`,
    }))
}
