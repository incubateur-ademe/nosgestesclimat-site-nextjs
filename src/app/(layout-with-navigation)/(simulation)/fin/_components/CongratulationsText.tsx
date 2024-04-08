'use client'

import CheckCircleIcon from '@/components/icons/CheckCircleIcon'
import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'

export default function CongratulationsText() {
  return (
    <>
      <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="mt-4 text-xl md:text-2xl" data-cypress-id="fin-title">
            <span className="flex items-center">
              <Trans>Vous avez terminé le test !</Trans>&nbsp;
              <CheckCircleIcon className="fill-emerald-default stroke-2" />
            </span>
          </h1>

          <p className="mb-0">
            <Trans>
              Découvrez vos résultats, et nos idées d'actions pour vous
              améliorer.
            </Trans>
          </p>
        </div>
      </div>

      <Separator />
    </>
  )
}
