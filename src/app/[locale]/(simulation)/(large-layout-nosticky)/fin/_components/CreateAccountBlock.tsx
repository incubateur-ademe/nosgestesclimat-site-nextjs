' use client'

import DownArrow from '@/components/icons/DownArrow'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'

export default function CreateAccountBlock() {
  const { t } = useClientTranslation()
  return (
    <Card className="mb-12 items-start border-none bg-[#F4F5FB] p-8">
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

      <Button className="mb-2">
        <DownArrow aria-hidden="true" className="mr-2 w-6 -rotate-90" />
        <Trans>Je crée mon compte</Trans>
      </Button>

      <Button color="text" className="px-0! text-xs! underline!">
        <Trans>Je ne préfère pas créer de compte</Trans>
      </Button>
    </Card>
  )
}
