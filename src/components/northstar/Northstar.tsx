import { simulationURL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import {
  NorthStarRatings,
  NorthStarType,
  NorthStarValue,
} from '@/types/northstar'
import { captureException } from '@sentry/browser'
import { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import EmojiButton from './EmojiButton'

const setRating = (
  ratings: NorthStarRatings,
  type: NorthStarType,
  value: NorthStarValue,
  text: string
) => {
  return { ...ratings, [type]: value, [type + '_text']: text }
}

export default function NorthStarInput({
  type,
  isAnimationCompleted,
  text,
}: {
  type: NorthStarType
  isAnimationCompleted: boolean
  text: string
}) {
  const { t } = useTranslation()

  const [hasSelectedRating, setHasSelectedRating] = useState(false)

  const {
    user,
    updateNorthStarRatings,
    currentSimulationId,
    getCurrentSimulation,
  } = useUser()

  const ratings = user?.northStarRatings

  const submitFeedback = (rating: 0 | 1 | 2 | 3) => {
    setHasSelectedRating(true)
    // TODO ici on devrait inverser la logique : informer l'utilisateur de la prise en compte après que le serveur a répondu Oui
    // ou à défaut gérer avec une logique optimiste mais un message d'erreur à posteriori en cas de problème

    setTimeout(() => {
      updateNorthStarRatings({ type, value: rating })

      const newRatings = setRating(ratings, type, rating, text)

      postData(getCurrentSimulation(), currentSimulationId, newRatings)
    }, 1000)
  }

  useEffect(() => {
    if (!isAnimationCompleted) return

    console.log('ratings', ratings)
    console.log('type', type)
    if (!ratings || ratings[type] !== 'no_display') return

    updateNorthStarRatings({ type, value: 'display' })

    const newRatings = setRating(ratings, type, 'display', text)

    if (
      [0, 1, 2, 3].includes(ratings.learned) ||
      [0, 1, 2, 3].includes(ratings.action)
    ) {
      // cas ou l'utilisateur a déjà envoyé une note, pour ne pas écraser les résultats en base
      postData(getCurrentSimulation(), currentSimulationId, newRatings)
    } else {
      postData(null, currentSimulationId, newRatings)
    }
  }, [
    ratings,
    type,
    currentSimulationId,
    isAnimationCompleted,
    text,
    getCurrentSimulation,
    updateNorthStarRatings,
  ])

  if (hasSelectedRating) {
    return (
      <p className="m-3">
        <Trans i18nKey={`publicodes.northstar.thankyou`}>
          Merci pour votre retour !
        </Trans>
      </p>
    )
  }

  return (
    <ul className="m-0 flex list-none flex-wrap justify-center p-0">
      <li>
        <EmojiButton
          onClick={() => submitFeedback(0)}
          aria-label={t('Pas vraiment, envoyer cette réponse')}
          title={t('Pas vraiment, envoyer cette réponse')}
          aria-hidden={false}>
          🙁
        </EmojiButton>
      </li>

      <li>
        <EmojiButton
          onClick={() => submitFeedback(1)}
          aria-label={t('Moyennement, envoyer cette réponse')}
          title={t('Moyennement, envoyer cette réponse')}
          aria-hidden={false}>
          😐
        </EmojiButton>
      </li>

      <li>
        <EmojiButton
          onClick={() => submitFeedback(2)}
          aria-label={t('Oui plutôt, envoyer cette réponse')}
          title={t('Oui plutôt, envoyer cette réponse')}
          aria-hidden={false}>
          🙂
        </EmojiButton>
      </li>

      <li>
        <EmojiButton
          onClick={() => submitFeedback(3)}
          aria-label={t('Tout à fait, envoyer cette réponse')}
          title={t('Tout à fait, envoyer cette réponse')}
          aria-hidden={false}>
          😀
        </EmojiButton>
      </li>
    </ul>
  )
}

const postData = async (data: any, id: string, ratings: NorthStarRatings) => {
  const selectedData = {
    results: data?.results && {
      categories: data.results.categories,
      total: data.results.total,
    },
    ratings,
  }

  const body = { data: selectedData, id }

  try {
    await fetch(simulationURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  } catch (e) {
    captureException(e)
  }
}
