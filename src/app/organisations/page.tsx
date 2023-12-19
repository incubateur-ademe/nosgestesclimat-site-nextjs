import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Main from '@/design-system/layout/Main'
import Separator from '@/design-system/layout/Separator'
import { headers } from 'next/headers'
import HeroSection from './_components/HeroSection'

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

      <section className="w-full bg-[#fff] ">
        <div className="mx-auto max-w-5xl px-6 lg:px-0">
          <HeroSection />

          <Separator className="my-12" />
        </div>
      </section>
    </Main>
  )
}
