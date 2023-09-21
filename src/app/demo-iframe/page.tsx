import Script from 'next/script'

export default function DemoIframePage() {
  return (
    <div className="p-8">
      <h2>iframe paramétré</h2>

      <p>Ci-dessous, nosgestesclimat.fr intégré comme un iframe paramétré.</p>

      <Script
        id="nosgestesclimat"
        src="http://localhost:3000/iframe.js"
        data-share-data="true"
      />
    </div>
  )
}
