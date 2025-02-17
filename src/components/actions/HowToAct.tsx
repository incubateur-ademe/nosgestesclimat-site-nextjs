'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { endClickActions } from '@/constants/tracking/pages/end'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import RecommendedActions from './howToAct/RecommendedActions'

export default function HowToAct({ shouldLeadToTest = true }) {
  return (
    <>
      <h2>
        <TransClient>Comment agir ?</TransClient>
      </h2>

      <p className="text-gray-600">
        {shouldLeadToTest ? (
          <TransClient>
            Découvrez nos pistes pour agir dès aujourd’hui pour le climat, ou
            passez le test pour obtenir des recommandations personnalisées.
          </TransClient>
        ) : (
          <TransClient>
            Découvrez nos pistes pour agir dès aujourd’hui pour le climat.
          </TransClient>
        )}
      </p>

      <RecommendedActions />

      <div className="mt-4">
        <ButtonLink
          href="/actions"
          color="secondary"
          trackingEvent={endClickActions}>
          <TransClient>Voir toutes les actions</TransClient>
        </ButtonLink>
      </div>
    </>
  )
}
