import Script from 'next/script'

export default function DemoIframePage() {
  return (
    <div>
      <header className="p-8">
        <h2>iframe paramétré</h2>

        <p>Ci-dessous, nosgestesclimat.fr intégré comme un iframe paramétré.</p>
      </header>

      <main>
        <Script id="nosgestesclimat" src="/iframe.js" data-share-data="true" />
      </main>
    </div>
  )
}
