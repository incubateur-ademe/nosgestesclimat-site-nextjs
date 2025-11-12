import ContentLarge from '@/components/layout/ContentLarge'
import ColourBlock from '@/components/signIn/ColourBlock'
import SigninSignUpForm from '@/components/signIn/SignInOrSignUpForm'
import SigninSignupTabs from '@/components/signIn/SigninSignupTabs'
import Trans from '@/components/translation/trans/TransServer'
import { SIGNUP_MODE } from '@/constants/authentication/modes'
import { MON_ESPACE_PATH } from '@/constants/urls/paths'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { UserProvider } from '@/publicodes-state'
import type { DefaultPageProps } from '@/types'
import QueryClientProviderWrapper from '../../_components/mainLayoutProviders/QueryClientProviderWrapper'

export default async function Connexion({ params }: DefaultPageProps) {
  const { locale } = await params

  const { t } = await getServerTranslation({ locale })

  return (
    <ContentLarge className="px-4 lg:px-0">
      <div className="flex justify-center pb-32 lg:justify-start">
        <div className="flex flex-col py-6 lg:w-1/2 lg:py-10 lg:pr-7">
          <SigninSignupTabs
            className="-order-1 mb-8 lg:mb-14"
            mode={SIGNUP_MODE}
          />

          <Title
            containerClassName="order-0 max-w-[430px] mb-4"
            title={
              <Trans i18nKey="signup.title" locale={locale}>
                Créez votre espace Nos Gestes Climat
              </Trans>
            }
          />

          <QueryClientProviderWrapper>
            <UserProvider>
              <SigninSignUpForm
                mode="signUp"
                buttonLabel={t('signup.button.label', "M'inscrire")}
                redirectURL={MON_ESPACE_PATH}
              />
            </UserProvider>
          </QueryClientProviderWrapper>
        </div>

        <ColourBlock
          className="ml-7 hidden w-1/2 self-start bg-fuchsia-50 lg:flex"
          highlights={[
            <span key="highlight1">
              <Trans
                i18nKey="signup.colourBlock.highlight1.title.prefix"
                locale={locale}>
                Retrouvez
              </Trans>{' '}
              <strong>
                <Trans
                  i18nKey="signup.colourBlock.highlight1.title.strong"
                  locale={locale}>
                  vos résultats d’empreinte
                </Trans>
              </strong>
            </span>,
            <span key="highlight2">
              <Trans
                i18nKey="signup.colourBlock.highlight2.title.prefix"
                locale={locale}>
                Découvrez
              </Trans>{' '}
              <strong>
                <Trans
                  i18nKey="signup.colourBlock.highlight2.title.strong1"
                  locale={locale}>
                  vos actions climat personnalisées
                </Trans>
              </strong>{' '}
              <Trans
                i18nKey="signup.colourBlock.highlight2.title.middle"
                locale={locale}>
                et
              </Trans>{' '}
              <strong>
                <Trans
                  i18nKey="signup.colourBlock.highlight2.title.strong2"
                  locale={locale}>
                  suivez vos progrès
                </Trans>
              </strong>
            </span>,
            <span key="highlight3">
              <strong>
                <Trans
                  i18nKey="signup.colourBlock.highlight3.title.strong1"
                  locale={locale}>
                  Lancez
                </Trans>
              </strong>{' '}
              <Trans
                i18nKey="signup.colourBlock.highlight3.title.middle"
                locale={locale}>
                et
              </Trans>{' '}
              <strong>
                <Trans
                  i18nKey="login.colourBlock.login.highlight3.strong2"
                  locale={locale}>
                  retrouvez vos tests collectifs
                </Trans>
              </strong>{' '}
              <Trans
                i18nKey="login.colourBlock.login.highlight3.end"
                locale={locale}>
                (organisations, famille, amis...)
              </Trans>
            </span>,
          ]}
        />
      </div>
    </ContentLarge>
  )
}
