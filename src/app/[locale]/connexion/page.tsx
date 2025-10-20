import ContentLarge from '@/components/layout/ContentLarge'
import Header from '@/components/layout/Header'
import ColourBlock from '@/components/signIn/ColourBlock'
import LoginSigninTabs, {
  LOGIN_MODE,
} from '@/components/signIn/LoginSigninTabs'
import SigninForm from '@/components/signIn/SigninForm'
import Trans from '@/components/translation/trans/TransServer'
import Title from '@/design-system/layout/Title'
import type { DefaultPageProps } from '@/types'
import { ClientLayout } from '../_components/ClientLayout'

type Props = DefaultPageProps

export default async function Connexion({ params }: Props) {
  const { locale } = await params

  return (
    <ClientLayout locale={locale}>
      <Header />

      <ContentLarge>
        <div className="flex gap-14">
          <div className="flex flex-col py-10">
            <LoginSigninTabs
              className="-order-1 mb-14"
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
    </ClientLayout>
  )
}
