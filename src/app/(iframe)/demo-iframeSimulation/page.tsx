import Script from 'next/script'

export default function DemoIframePage() {
  return (
    <div>
      <Script
        id="nosgestesclimat"
        src="/iframeSimulation.js"
        data-only-simulation="true"
        data-localisation="CH"
        data-pr="1872"
        data-share-data="true"
      />
    </div>
  )
}
