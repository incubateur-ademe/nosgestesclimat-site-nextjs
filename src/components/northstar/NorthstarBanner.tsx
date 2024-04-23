'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { NorthStarType } from '@/types/northstar'
import { motion } from 'framer-motion'
import { JSX, useEffect, useRef, useState } from 'react'
import Trans from '../translation/Trans'
import Northstar from './Northstar'

export default function NorthStarBanner({
  type,
}: {
  type: NorthStarType
}): JSX.Element | null {
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false)

  const { t } = useClientTranslation()

  const { progression } = useCurrentSimulation()

  const { actionChoices } = useCurrentSimulation()

  const actionChoicesLength = Object.values(actionChoices || {}).filter(
    (value) => value
  ).length

  const { user, updateNorthStarRatings } = useUser()

  const shouldDisplayLearn =
    user?.northStarRatings?.learned === 'display' ||
    user?.northStarRatings?.learned === 'no_display'

  const shouldDisplayAction =
    (user?.northStarRatings?.action === 'display' ||
      user?.northStarRatings?.action === 'no_display') &&
    actionChoicesLength > 1

  const shouldDisplayNorthstarBanner =
    progression === 1 &&
    (shouldDisplayAction || shouldDisplayLearn) &&
    process.env.NODE_ENV === 'production'

  const closeFeedback = () => {
    setTimeout(() => {
      updateNorthStarRatings({ type, value: 'refuse' })
    }, 1000)
  }

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (shouldDisplayNorthstarBanner && !isAnimationCompleted) {
      timeoutRef.current = setTimeout(() => {
        document.getElementById('northstarBanner')?.scrollIntoView({
          behavior: 'smooth',
        })
      }, 2000)
    }
  }, [shouldDisplayNorthstarBanner, isAnimationCompleted])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (!shouldDisplayNorthstarBanner) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0, display: 'none' }}
      animate={{ opacity: 1, y: 0, scale: 1, display: 'block' }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.8 } }}
      transition={{ delay: shouldDisplayLearn ? 8 : 1, duration: 0.8 }}
      onAnimationComplete={() => {
        setIsAnimationCompleted(true)
      }}
      id="northstarBanner"
      className="relative m-0 h-auto w-auto rounded-xl bg-green-50 shadow-md sm:m-2">
      <button
        className="bold absolute right-0 top-0 h-10 w-10 text-center text-lg"
        onClick={closeFeedback}
        aria-label={t('Fermer le bandeau de feedback')}>
        &#215;
      </button>

      <div className="flex items-center justify-center">
        <div className="m-auto max-w-[420px] p-6">
          <h2>
            <b>
              <Trans i18nKey={'publicodes.northstar.title'}>
                Petite question entre nous...
              </Trans>
            </b>
          </h2>

          {type === 'action' ? (
            <>
              <p>
                <Trans i18nKey={'publicodes.northstar.action'}>
                  Nos Gestes Climat vous donne envie d'agir pour réduire votre
                  empreinte carbone ?
                </Trans>
              </p>
              <Northstar
                type="action"
                isAnimationCompleted={isAnimationCompleted}
                text={t('publicodes.northstar.action')}
              />
            </>
          ) : (
            <>
              <p>
                <b>
                  <Trans i18nKey={'publicodes.northstar.learned'}>
                    Est-ce que "Nos Gestes Climat" vous a permis d'apprendre
                    quelque chose ?
                  </Trans>
                </b>
              </p>
              <Northstar
                type="learned"
                isAnimationCompleted={isAnimationCompleted}
                text={t('publicodes.northstar.learned')}
              />
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
