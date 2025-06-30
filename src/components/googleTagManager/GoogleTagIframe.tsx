'use client'

export function GoogleTagIframe() {
  return (
    <noscript>
      <iframe
        title="google-tag-iframe"
        src="https://www.googletagmanager.com/ns.html?id=GTM-PVK9L8MK"
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
