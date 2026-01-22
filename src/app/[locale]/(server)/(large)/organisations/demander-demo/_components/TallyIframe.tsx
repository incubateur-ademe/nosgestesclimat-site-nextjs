'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'

export default function TallyIframe() {
  const { t } = useClientTranslation()

  return (
    <div className="flex list-none flex-col rounded-xl border-2 border-gray-500 bg-white p-4">
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
            iframe.setAttribute('title', t('Formulaire - Demander une démo'))
          }
        }}></iframe>
    </div>
  )
}
