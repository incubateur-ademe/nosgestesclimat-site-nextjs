'use client'

import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import type { Organisation } from '@/types/organisations'
import { useSelectedLayoutSegments } from 'next/navigation'
import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

type Items = ComponentProps<typeof Breadcrumbs>['items']
export default function FilAriane({
  className,
  baseItems,
  organisation,
}: {
  className?: string
  baseItems: Items
  organisation: Organisation
}) {
  const { t } = useTranslation()
  const segments = useSelectedLayoutSegments().filter(
    (name) => !name.startsWith('(')
  )
  const organisationHref = `/organisations/${organisation.slug}`
  const items = [
    ...baseItems,
    {
      label: organisation.name,
      href: organisationHref,
      isActive: !segments.length,
    },
  ]
  // TODO !!

  return <Breadcrumbs className={className} items={items} />
}
