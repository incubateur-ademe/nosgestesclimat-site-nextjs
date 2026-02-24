'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'

export function GoogleTagIframe() {
  const { t } = useClientTranslation()

  return (
    <noscript>
      <iframe
        id="google-tag-iframe"
        title={t('Iframe - Google Tag Manager')}
        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
