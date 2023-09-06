import Head from 'next/head'

export default function AutoCanonicalTag({
  overrideHref,
}: {
  overrideHref?: string
}) {
  return (
    <Head>
      <link
        rel="canonical"
        href={
          overrideHref ?? `${window.location.origin}${window.location.pathname}`
        }
      />
    </Head>
  )
}
