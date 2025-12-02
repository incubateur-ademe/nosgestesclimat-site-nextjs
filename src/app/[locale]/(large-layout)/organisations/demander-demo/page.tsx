import OrganisationFilAriane from '@/components/layout/FilAriane'
import Trans from '@/components/translation/trans/TransServer'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Script from 'next/script'

/* global PageProps */

export default async function DemanderDemoPage({
  params,
}: PageProps<'/[locale]/organisations/demander-demo'>) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  return (
    <>
      <OrganisationFilAriane
        t={t}
        currentPage={{
          label: t('Demander une démo'),
          href: `/organisations/demander-demo`,
        }}
      />
      <section className="w-full bg-[#fff]">
        <div className="mx-auto max-w-5xl py-10">
          <Title
            title={<Trans locale={locale}>Demander une démo</Trans>}
            subtitle={
              <Trans locale={locale}>
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
              id="iframe-demo"
              // This title is overwritten by Tally
              title={t('Formulaire - Demander une démo')}
              onLoad={() => {
                const iframe = document.querySelector('#iframe-demo')
                if (iframe) {
                  iframe.setAttribute(
                    'title',
                    t('Formulaire - Demander une démo')
                  )
                }
              }}></iframe>
          </Card>

          <Script id="tally">{`var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}`}</Script>
        </div>
      </section>
    </>
  )
}
