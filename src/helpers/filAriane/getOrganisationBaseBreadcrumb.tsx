import type Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import type { TFunction } from 'i18next'
import type { ComponentProps } from 'react'

export function getOrganisationBaseBreadcrumb(t: TFunction) {
  return [
    {
      href: '/',
      label: t('Accueil'),
    },
    {
      href: '/organisations',
      label: t('Organisations'),
    },
  ] as ComponentProps<typeof Breadcrumbs>['items']
}
