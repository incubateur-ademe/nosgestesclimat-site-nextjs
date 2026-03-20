import Script from 'next/script'

export default function ServerTracking() {
  return (
    <Script
      id="global-tracking"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{

      }}
    />
  )
}
