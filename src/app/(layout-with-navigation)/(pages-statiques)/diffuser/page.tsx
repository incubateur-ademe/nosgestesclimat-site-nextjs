'use client'

import DiffuserEn from '@/locales/pages/en/diffuser.mdx'
import DiffuserFr from '@/locales/pages/fr/diffuser.mdx'

import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'

import { useLocale } from '@/hooks/useLocale'

export default function Diffuser() {
  const locale = useLocale()

  const DiffuserLocalised = getLocalisedMDX({
    dictionnaries: {
      fr: DiffuserFr,
      en: DiffuserEn,
    },
    locale: locale ?? '',
  })

  return <DiffuserLocalised />
}
