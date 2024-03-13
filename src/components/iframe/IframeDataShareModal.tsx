'use client'

import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useGetResultsFromDetailParam } from '@/hooks/useGetResultsFromDetailParam'
import { useIframe } from '@/hooks/useIframe'
import { getIsIframe } from '@/utils/getIsIframe'
import { ReactNode, useEffect, useRef, useState } from 'react'
import Trans from '../translation/Trans'

// We let iframe integrators ask the user if he wants to share its simulation data to the parent window
const shareDataPopupTimeout = 3500

export default function IframeDataShareModal() {
  const { t } = useClientTranslation()

  const [isOpen, setIsOpen] = useState(false)

  const data = useGetResultsFromDetailParam()

  //To delay the dialog show in to let the animation play
  const timeoutRef = useRef<NodeJS.Timeout>()
  const isIframe = getIsIframe()
  const { isIframeShareData } = useIframe()

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = undefined

      setIsOpen(true)
    }, shareDataPopupTimeout)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const onReject = () => {
    window.parent.postMessage(
      {
        messageType: 'ngc-iframe-share',
        error: 'The user refused to share his result.',
      },
      '*'
    )
    setIsOpen(false)
  }

  const onAccept = () => {
    delete data?.bilan

    window.parent.postMessage({ messageType: 'ngc-iframe-share', data }, '*')

    setIsOpen(false)
  }

  if (!isIframe || !document.referrer || !isIframeShareData) {
    return null
  }

  const parent = (document.referrer
    ? String(new URL(document.referrer).hostname)
    : 'parent') as unknown as ReactNode

  if (!isOpen) return null

  return (
    <Card className="absolute z-10 bg-white">
      <h2>
        <Trans i18nKey={'publicodes.fin.IframeDataShareModal.partageResultats'}>
          Partage de vos résultats à {{ parent }} ?
        </Trans>
      </h2>
      <div>
        <p>
          <Trans i18nKey="IframeDataShareModal.text1">
            En cliquant sur le bouton Accepter, vous autorisez {{ parent }} à
            récupérer le bilan de votre empreinte climat.
          </Trans>
        </p>
        <p>
          <Trans i18nKey="IframeDataShareModal.text2">
            Il s'agit de vos résultats sur les grandes catégories (transport,
            alimentation...), mais <em>pas</em> le détail question par question
            (vos km en voiture, les m² de votre logement...).
          </Trans>
        </p>
        <p>
          <Trans i18nKey="IframeDataShareModal.text3">
            Nosgestesclimat.fr n'est pas affilié au site {{ parent }}.
          </Trans>
        </p>
      </div>
      <div className="flex gap-4">
        <Button color="secondary" onClick={onReject}>
          {t('👎 Refuser')}
        </Button>
        <Button onClick={onAccept}>{t('👍 Accepter')}</Button>
      </div>
    </Card>
  )
}
