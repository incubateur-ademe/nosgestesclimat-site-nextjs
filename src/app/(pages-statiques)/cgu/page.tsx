'use client'

import PageLayout from '@/components/layout/PageLayout'
import Main from '@/design-system/layout/Main'
import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { useLocale } from '@/hooks/useLocale'
import CGUEn from '@/locales/pages/en-us/CGU.mdx'
import CGUFr from '@/locales/pages/fr/CGU.mdx'
// import contentEs from '@/locales/pages/es/CGU.md'
// import contentIt from '@/locales/pages/it/CGU.md'

export default function CGU() {
  const locale = useLocale()

  const CGULocalised = getLocalisedMDX({
    dictionnaries: {
      fr: CGUFr,
      'en-US': CGUEn,
    },
    locale: locale ?? '',
  })

  return (
    <PageLayout shouldShowMenu>
      <Main className='max-w-[800px] p-8'>
        <CGULocalised />
      </Main>
    </PageLayout>
  )
}
