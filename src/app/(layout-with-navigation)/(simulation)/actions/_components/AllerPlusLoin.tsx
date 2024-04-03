'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'

export default function AllerPlusLoin() {
  const { t } = useClientTranslation()

  return (
    <Card className="mt-4 flex !w-full !whitespace-normal rounded-2xl bg-primary-500 p-8 !text-left">
      <div className="flex gap-2">
        <span
          className="inline-block text-4xl"
          role="img"
          aria-label="emoji books"
          aria-hidden>
          <Emoji>📚</Emoji>
        </span>

        <h2 className="text-white">
          <Trans>Aller plus loin</Trans>
        </h2>
      </div>

      <div>
        <p className="text-white">
          Au-delà d'un simple chiffre, découvrez les enjeux qui se cachent
          derrière chaque action :
        </p>

        <ul>
          <li className="mb-1">
            <Link
              className="block text-white underline hover:text-primary-200"
              href="/actions/plus">
              <Trans>Explorez le détail de nos actions clés</Trans>
            </Link>
          </li>

          <li>
            <Link
              className="block text-white underline hover:text-primary-200"
              href="https://agirpourlatransition.ademe.fr/particuliers/"
              aria-label={t(
                "Découvrez les conseils de l'ADEME, ouvrir dans un nouvel onglet"
              )}>
              <Trans>Découvrez les conseils de l'ADEME</Trans>
            </Link>
          </li>
        </ul>
      </div>
    </Card>
  )
}
