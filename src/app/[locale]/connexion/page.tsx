import ContentLarge from '@/components/layout/ContentLarge'
import Header from '@/components/layout/Header'
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
        </div>
      </ContentLarge>
    </ClientLayout>
  )
}
