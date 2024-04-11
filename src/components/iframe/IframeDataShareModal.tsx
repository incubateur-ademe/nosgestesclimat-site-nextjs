'use client'

import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useIframe } from '@/hooks/useIframe'
import { useCurrentSimulation } from '@/publicodes-state'
import { getIsIframe } from '@/utils/getIsIframe'
import { useEffect, useRef, useState } from 'react'

// We let iframe integrators ask the user if he wants to share its simulation data to the parent window
const shareDataPopupTimeout = 3500

export default function IframeDataShareModal() {
  const { t } = useClientTranslation()

  const [isOpen, setIsOpen] = useState(false)

  const { computedResults } = useCurrentSimulation()

  const categories = computedResults?.categories ?? {}

  const data = Object.keys(categories).reduce(
    (accumulator, categoryName) => ({
      ...accumulator,
      [categoryName.charAt(0)]: Math.round(categories[categoryName]),
    }),
    {}
  )

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
    window.parent.postMessage({ messageType: 'ngc-iframe-share', data }, '*')

    setIsOpen(false)
  }

  if (!isIframe || !isIframeShareData) {
    return null
  }

  const parent = document.referrer
    ? String(new URL(document.referrer).hostname)
    : 'site parent inconnu'

  if (!isOpen) return null

  return (
    <Card className="absolute z-10 bg-white">
      <h2>{t(`Partage de vos résultats à {{ parent }} ?`, { parent })}</h2>
      <div>
        <p>
          {t(
            `En cliquant sur le bouton Accepter, vous autorisez {{ parent }} à récupérer le bilan de votre empreinte climat.`,
            { parent }
          )}
        </p>
        <p>
          {t(
            `Il s'agit de vos résultats sur les grandes catégories (transport, alimentation...), mais <em>pas</em> le détail question par question (vos km en voiture, les m² de votre logement...).`
          )}
        </p>
        <p>
          {t(`Nosgestesclimat.fr n'est pas affilié au site {{ parent }}.`, {
            parent,
          })}
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
