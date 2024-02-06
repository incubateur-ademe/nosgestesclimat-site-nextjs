'use client'

import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { usePathname } from 'next/navigation'
import useFetchOrganization from '../../../_hooks/useFetchOrganization'

export default function ResultatsDetaillesPage() {
  const pathname = usePathname()

  const { user } = useUser()

  const { t } = useClientTranslation()

  const { data: organization } = useFetchOrganization({
    email: user.email,
  })

  return (
    <>
      <Breadcrumbs
        items={[
          {
            href: '/',
            label: t('Accueil'),
            isActive: pathname === '/',
          },
          {
            href: '/organisations',
            label: t('Organisations'),
            isActive: pathname === '/organisations',
          },
          {
            href: `/organisations/mon-espace/${organization?.slug}`,
            label: organization?.name,
            isActive: pathname.includes('/organisations/mon-espace'),
          },
        ]}
      />
    </>
  )
}
