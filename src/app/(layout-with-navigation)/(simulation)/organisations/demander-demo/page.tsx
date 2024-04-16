'use client'

import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Script from 'next/script'

export default function DemanderDemoPage() {
  return (
    <section className="w-full bg-[#fff] ">
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-0">
        <Title
          title={<Trans>Demander une démo</Trans>}
          subtitle={
            <Trans>
              Contactez nous afin de convenir d'un temps de démonstration de
              notre outil pour les organisations.
            </Trans>
          }
        />
        <Card>
          <iframe
            data-tally-src="https://tally.so/embed/w4Kedk?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="1306"
            title="Vous avez un retour sur Nos Gestes Climat ?"></iframe>
        </Card>

        <Script id="tally">{`var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}`}</Script>
      </div>
    </section>
  )
}
