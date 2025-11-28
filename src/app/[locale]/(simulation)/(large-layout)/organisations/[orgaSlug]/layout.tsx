import FilAriane from '@/components/layout/FilAriane'
import { getOrganisationBaseBreadcrumb } from '@/helpers/filAriane/getOrganisationBaseBreadcrumb'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import { getOrganisation } from '@/helpers/server/model/organisations'
import type { DefaultPageProps } from '@/types'
import { notFound } from 'next/navigation'

export const generateMetadata = getCommonMetadata<
  DefaultPageProps<{ params: { orgaSlug: string } }>
>({
  title: 'Mon espace organisation - Nos Gestes Climat',
  description:
    'Accédez à des services sur mesure pour sensibiliser vos partenaires au sein de votre organisation.',
  alternates: ({ orgaSlug }) => ({
    canonical: `/organisations/${orgaSlug}`,
  }),
})

/* global LayoutProps */
export default async function Layout({
  children,
  params,
}: LayoutProps<'/[locale]/organisations/[orgaSlug]'>) {
  const { locale, orgaSlug } = await params
  const organisation = await getOrganisation(orgaSlug)
  if (!organisation) {
    notFound()
  }

  const { t } = await getServerTranslation({ locale })
  const baseItems = getOrganisationBaseBreadcrumb(t)
  return (
    <>
      <FilAriane baseItems={baseItems} organisation={organisation} />
      {children}
    </>
  )
}
