'use client'

import DiffuserEn from '@/locales/pages/en-us/diffuser.mdx'
import DiffuserFr from '@/locales/pages/fr/diffuser.mdx'

import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'

import PageLayout from '@/components/layout/PageLayout'
import { useLocale } from '@/hooks/useLocale'

export default function Diffuser() {
  const locale = useLocale()

  const DiffuserLocalised = getLocalisedMDX({
    dictionnaries: {
      fr: DiffuserFr,
      'en-US': DiffuserEn,
    },
    locale: locale ?? '',
  })

  return (
    <PageLayout shouldShowMenu>
      <DiffuserLocalised />
    </PageLayout>
  )
}
