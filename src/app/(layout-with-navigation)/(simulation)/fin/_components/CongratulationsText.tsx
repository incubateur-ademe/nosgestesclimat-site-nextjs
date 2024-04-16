'use client'

import Separator from '@/design-system/layout/Separator'
import Emoji from '@/design-system/utils/Emoji'

export default function CongratulationsText() {
  return (
    <>
      <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="mt-4 text-xl md:text-2xl" data-cypress-id="fin-title">
            <span className="flex items-center">
              <NGCTrans>Vous avez terminé le test !</NGCTrans>&nbsp;
              <Emoji className="inline-block">👏</Emoji>
            </span>
          </h1>

          <p className="mb-0">
            <NGCTrans>
              Découvrez vos résultats, et nos idées d'actions pour vous
              améliorer.
            </NGCTrans>
          </p>
        </div>
      </div>

      <Separator />
    </>
  )
}
