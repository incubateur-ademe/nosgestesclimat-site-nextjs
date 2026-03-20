type IframeInformation =
  | {
      iframe: false
    }
  | {
      iframe: true
      referrer: string | undefined
      referringDomain: string | undefined
    }

export function getIframeInformation(): IframeInformation {
  const searchParams = new URLSearchParams(location.search)
  const iframe =
    // 1. Standard method
    window.self !== window.top ||
    // 2. Fallback to iframe=true query param
    searchParams.get('iframe') === 'true'

  const referrer =
    searchParams.get('integratorUrl') ??
    document.location.ancestorOrigins?.[0] ??
    document.referrer

  let referringDomain
  try {
    const url = new URL(referrer)
    referringDomain = url.hostname
  } catch {}
  return {
    iframe,
    referrer,
    referringDomain,
  }
}
