import ContentLarge from '@/components/layout/ContentLarge'
import HeaderServer from '@/components/layout/HeaderServer'
import ColourBlock from '@/components/signIn/ColourBlock'
import LoginSigninTabs, {
  LOGIN_MODE,
} from '@/components/signIn/LoginSigninTabs'
import SigninForm from '@/components/signIn/SigninForm'
import Trans from '@/components/translation/trans/TransServer'
import Title from '@/design-system/layout/Title'
import type { DefaultPageProps } from '@/types'

export default async function Connexion({ params }: DefaultPageProps) {
  const { locale } = await params

  return (
    <>
      <HeaderServer locale={locale} />

      <ContentLarge className="px-4 lg:px-0">
        <div className="flex justify-center gap-14 pb-32 lg:justify-start">
          <div className="flex flex-col py-6 lg:py-10">
            <LoginSigninTabs
              className="-order-1 mb-8 lg:mb-14"
              locale={locale}
              mode={LOGIN_MODE}
            />

            <Title
              containerClassName="order-0 max-w-[430px] mb-4"
              title={
                <Trans i18nKey="login.login.title" locale={locale}>
                  Accédez à votre espace Nos Gestes Climat
                </Trans>
              }
            />

            <SigninForm />
          </div>

          <ColourBlock
            className="hidden lg:block"
            highlights={[
              <span key="highlight1">
                <Trans i18nKey="login.colourBlock.highlight1" locale={locale}>
                  Visualisez
                </Trans>{' '}
                <strong>
                  <Trans
                    i18nKey="login.colourBlock.login.highlight1.strong"
                    locale={locale}>
                    vos derniers résultats
                  </Trans>
                </strong>
              </span>,
              <span key="highlight2">
                <Trans
                  i18nKey="login.colourBlock.login.highlight2"
                  locale={locale}>
                  Continuez à
                </Trans>{' '}
                <strong>
                  <Trans
                    i18nKey="login.colourBlock.login.highlight2.strong"
                    locale={locale}>
                    progresser dans vos actions climat
                  </Trans>
                </strong>
              </span>,
              <span key="highlight3">
                <Trans i18nKey="login.colourBlock.highlight3" locale={locale}>
                  Accédez à
                </Trans>{' '}
                <strong>
                  <Trans
                    i18nKey="login.colourBlock.login.highlight3.strong"
                    locale={locale}>
                    vos défis collectifs
                  </Trans>
                </strong>{' '}
                <Trans
                  i18nKey="login.colourBlock.login.highlight3.end"
                  locale={locale}>
                  en cours
                </Trans>
              </span>,
            ]}
          />
        </div>
      </ContentLarge>
    </>
  )
}
