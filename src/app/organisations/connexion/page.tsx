import Trans from '@/components/translation/Trans'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Main from '@/design-system/layout/Main'
import Separator from '@/design-system/layout/Separator'
import { headers } from 'next/headers'
import EmailSection from './_components/EmailSection'

export default function Page() {
  const headersList = headers()

  const pathname = headersList.get('next-url')

  return (
    <Main>
      <Breadcrumbs
        items={[
          {
            href: '/',
            label: 'Accueil',
            isActive: pathname === '/',
          },
          {
            href: '/organisations',
            label: 'Organisations',
            isActive: pathname === '/organisations',
          },
        ]}
      />

      <section className="w-full bg-[#fff] pt-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-0">
          <h1>
            <Trans>Accédez à votre espace organisation</Trans>
          </h1>

          <p>
            <Trans>C'est gratuit, et ça prend une minute !</Trans>
          </p>

          <Separator />

          <div className="w-[40rem] max-w-full">
            <EmailSection />
          </div>
        </div>
      </section>
    </Main>
  )
}
