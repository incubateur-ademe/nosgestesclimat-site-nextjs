'use client'

import DownArrow from '@/components/icons/DownArrow'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'

export default function DefautState({
  onAccept,
  onRefuse,
}: {
  onAccept: () => void
  onRefuse: () => void
}) {
  const { t } = useClientTranslation()

  return (
    <div data-testid="default-state">
      <Title
        tag="h2"
        className="text-lg font-bold"
        title={t(
          'Votre empreinte est un point de départ. Et si vous alliez plus loin ?'
        )}
      />

      <p>
        <strong>
          <Trans>Créer un compte</Trans>
        </strong>{' '}
        vous permet de :
      </p>

      <ul className="mb-8">
        <li>
          <Emoji>👉</Emoji>{' '}
          <strong>
            <Trans>Retrouver votre historique</Trans>
          </strong>{' '}
          <Trans>de simulation à tout moment</Trans>
        </li>
        <li>
          <Emoji>👉</Emoji>{' '}
          <strong>
            <Trans>Bénéficier de conseils personnalisés</Trans>
          </strong>{' '}
          <Trans>pour agit sur vos empreintes</Trans>
        </li>
      </ul>

      <div>
        <Button onClick={onAccept} data-testid="accept-button" className="mb-4">
          <DownArrow aria-hidden="true" className="mr-2 w-6 -rotate-90" />
          <Trans>Je crée mon compte</Trans>
        </Button>
      </div>

      <div>
        <Button
          onClick={onRefuse}
          color="link"
          className="p-0! text-xs! underline!"
          data-testid="refuse-button">
          <Trans>Je ne préfère pas créer de compte</Trans>
        </Button>
      </div>
    </div>
  )
}
