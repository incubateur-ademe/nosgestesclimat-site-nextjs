'use client'

import { defaultMetric } from '@/constants/model/metric'
import Button from '@/design-system/buttons/Button'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation } from '@/publicodes-state'
import { useEffect, useRef, useState } from 'react'

// We let iframe integrators ask the user if he wants to share its simulation data to the parent window
const shareDataPopupTimeout = 3500

export default function IframeDataShareModal() {
  const { t } = useClientTranslation()

  const [isOpen, setIsOpen] = useState(false)

  const { computedResults } = useCurrentSimulation()

  const categories = computedResults[defaultMetric].categories ?? {}

  const data = Object.keys(categories).reduce(
    (accumulator, categoryName) => ({
      ...accumulator,
      [categoryName.charAt(0)]: Math.round(
        categories[categoryName as keyof typeof categories]
      ),
    }),
    {}
  )

  //To delay the dialog show in to let the animation play
  const timeoutRef = useRef<NodeJS.Timeout>(undefined)

  const resetOverflow = () => (document.body.style.overflow = 'auto')

  const onReject = () => {
    window.parent.postMessage(
      {
        messageType: 'ngc-iframe-share',
        error: 'The user refused to share his result.',
      },
      '*'
    )
    setIsOpen(false)

    resetOverflow()
  }

  const onAccept = () => {
    window.parent.postMessage({ messageType: 'ngc-iframe-share', data }, '*')

    setIsOpen(false)

    resetOverflow()
  }

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

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      resetOverflow()
    }
  }, [])

  const parent = document.referrer
    ? String(new URL(document.referrer).hostname)
    : 'site parent inconnu'

  if (!isOpen) return null

  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 z-1000 overflow-auto bg-black/50"
      data-testid="iframe-datashare-modal">
      <Card className="absolute top-4 left-1/2 z-1000 w-[calc(100%-16px)] -translate-x-1/2 bg-white sm:max-w-lg">
        <h2
          className="text-lg md:text-2xl"
          data-testid="iframe-datashare-title">
          {t(`Partage de vos résultats à {{ parent }} ?`, { parent })}
        </h2>
        <div className="text-sm md:text-base">
          <p>
            {t(
              `En cliquant sur le bouton Accepter, vous autorisez {{ parent }} à récupérer le bilan de votre empreinte climat.`,
              { parent }
            )}
          </p>
          <p>
            {t(
              `Il s'agit de vos résultats sur les grandes catégories (transport, alimentation...), mais pas le détail question par question (vos km en voiture, les m² de votre logement...).`
            )}
          </p>
          <p>
            {t(`Nosgestesclimat.fr n'est pas affilié au site {{ parent }}.`, {
              parent,
            })}
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            color="secondary"
            onClick={onReject}
            data-testid="iframe-datashare-refuser">
            {t('Refuser')}
          </Button>
          <Button onClick={onAccept} data-testid="iframe-datashare-accepter">
            {t('Accepter')}
          </Button>
        </div>
      </Card>
    </div>
  )
}
