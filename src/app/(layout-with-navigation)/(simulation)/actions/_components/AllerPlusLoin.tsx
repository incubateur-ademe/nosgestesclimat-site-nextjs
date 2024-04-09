'use client'

import Link from '@/components/Link'
import BookClosedIcon from '@/components/icons/BookClosedIcon'
import Trans from '@/components/translation/Trans'
import {
  actionsClickActionsPlus,
  actionsClickAdeme,
} from '@/constants/tracking/pages/actions'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function AllerPlusLoin() {
  const { t } = useClientTranslation()

  return (
    <Card className="mt-4 flex !w-full !whitespace-normal rounded-2xl bg-primary-700 p-8 !text-left">
      <div className="flex gap-2">
        <h2 className="flex items-center text-white">
          <BookClosedIcon aria-hidden className="mr-3 fill-white" />

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
              href="/actions/plus"
              onClick={() => trackEvent(actionsClickActionsPlus)}>
              <Trans>Explorez le détail de nos actions clés</Trans>
            </Link>
          </li>

          <li>
            <Link
              className="block text-white underline hover:text-primary-200"
              href="https://agirpourlatransition.ademe.fr/particuliers/"
              onClick={() => trackEvent(actionsClickAdeme)}
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
