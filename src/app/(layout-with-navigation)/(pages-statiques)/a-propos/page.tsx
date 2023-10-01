import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import AboutEn from '@/locales/pages/en-us/about.mdx'
import AboutFr from '@/locales/pages/fr/about.mdx'
import { currentLocale } from 'next-i18n-router'

export function generateMetadata() {
  return getMetadataObject({
    title: 'À propos - Nos Gestes Climat',
    description: 'Informations relatives à Nos Gestes Climat.',
  })
}

export default function AProposPage() {
  const locale = currentLocale()

  const AProposLocalised = getLocalisedMDX({
    dictionnaries: {
      fr: AboutFr,
      en: AboutEn,
    },
    locale: locale ?? '',
  })

  return <AProposLocalised />
}
