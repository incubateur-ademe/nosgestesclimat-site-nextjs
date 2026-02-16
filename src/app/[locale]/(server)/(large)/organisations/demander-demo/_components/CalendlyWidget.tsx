'use client'

import Script from 'next/script'

export default function CalendlyWidget() {
  return (
    <>
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/nos-gestes-climat/demo-parcours-organisation"
        style={{ minWidth: '320px', height: '700px' }}
      />
      <Script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      />
    </>
  )
}
