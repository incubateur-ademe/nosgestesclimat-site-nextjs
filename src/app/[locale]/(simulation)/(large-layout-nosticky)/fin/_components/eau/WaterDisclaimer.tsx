'use client'

import TransClient from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'

export default function WaterDisclaimer() {
  return (
    <div>
      <Title tag="h2">
        <TransClient>
          Est-ce que c'est{' '}
          <strong className="text-secondary-700">beaucoup ?</strong>
        </TransClient>
      </Title>
      <p>
        <TransClient>
          En règle générale, les valeurs d'empreinte eau varient{' '}
          <strong className="text-secondary-700">
            entre 3 000 et 9 000 litres par jour
          </strong>
          . Contrairement au carbone, il n'existe pas d'objectif chiffré pour
          l'empreinte eau.
        </TransClient>
      </p>
      <p>
        <TransClient>
          Nous n'affichons pas la valeur par défaut en début de test. En effet,
          notre modèle eau étant le premier du genre en France, nous ne voulons
          pas qu'elle soit perçue comme la valeur moyenne nationale.
        </TransClient>
      </p>
    </div>
  )
}
