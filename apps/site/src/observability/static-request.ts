/** Requests that serve a file, not a page. Mirrors the proxy matcher
 * exclusions, kept in step by hand. */
const STATIC_PATH = new URLPattern({
  pathname: '/(_next|_static|images|scripts|demos|misc|videos)/*',
})

const STATIC_FILE = new URLPattern({
  pathname:
    '/(favicon.ico|favicon.png|manifest.webmanifest|robots.txt|sitemap.xml)',
})

const ASSET_EXTENSION = new URLPattern({
  pathname:
    '/*.(avif|bmp|css|gif|ico|jpe?g|js|map|mp4|png|svg|webm|webp|woff2?)',
})

export function isStaticRequest(url: string | undefined): boolean {
  // `request.url` is the path, query string included when there is one.
  const [path] = url?.split('?') ?? []

  if (!path) {
    return false
  }

  // The patterns read the pathname alone, and lowercased: the extension check
  // used to be case-insensitive.
  const request = { pathname: path.toLowerCase() }

  return (
    STATIC_PATH.test(request) ||
    STATIC_FILE.test(request) ||
    ASSET_EXTENSION.test(request)
  )
}
