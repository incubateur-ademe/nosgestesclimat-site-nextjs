import type { ComponentProps } from 'react'
import FooterServer from './footer/FooterServer'
import HideInIframe from './footer/HideInIframe'

type Props = ComponentProps<typeof FooterServer>

export default function Footer({ pathname, locale }: Props) {
  return (
    <HideInIframe>
      <FooterServer pathname={pathname} locale={locale} />
    </HideInIframe>
  )
}
