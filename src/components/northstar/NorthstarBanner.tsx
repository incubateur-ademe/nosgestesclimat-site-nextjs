'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useForm, useUser } from '@/publicodes-state'
import { NorthStarType } from '@/types/northstar'
import { motion } from 'framer-motion'
import { JSX, useEffect, useRef, useState } from 'react'
import { Trans } from 'react-i18next'
import Northstar from './Northstar'

export default function NorthStarBanner({
  type,
}: {
  type: NorthStarType
}): JSX.Element | null {
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false)

  const { t } = useClientTranslation()

  const { progression } = useForm()

  const { user, updateNorthStarRatings, currentSimulation } = useUser()

  const shouldDisplayLearn =
    user?.northStarRatings?.learned === 'display' ||
    user?.northStarRatings?.learned === 'no_display'

  const shouldDisplayAction =
    (user?.northStarRatings?.action === 'display' ||
      user?.northStarRatings?.action === 'no_display') &&
    currentSimulation?.actionChoices?.length > 1

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
      className="w-auto bg-green-50 rounded-lg h-auto relative m-0 sm:m-2 shadow-md">
      <button
        className="absolute top-0 right-0 text-lg bold w-10 h-10 text-center"
        onClick={closeFeedback}
        aria-label={t('Fermer le bandeau de feedback')}>
        &#215;
      </button>

      <div className="flex items-center justify-center">
        <div className="p-6 max-w-[420px] m-auto">
          <h2>
            <Trans i18nKey={'publicodes.northstar.title'}>
              <b>Petite question entre nous...</b>
            </Trans>
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
                <Trans i18nKey={'publicodes.northstar.title'}>
                  <b>Petite question entre nous...</b>
                </Trans>
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
