import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import { headers } from 'next/headers'

export default function Page() {
  const headersList = headers()

  const pathname = headersList.get('next-url')

  return (
    <>
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
    </>
  )
}
