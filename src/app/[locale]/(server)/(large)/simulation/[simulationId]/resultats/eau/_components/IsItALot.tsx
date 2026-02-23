import Trans from '@/components/translation/trans/TransServer'
import type { Locale } from '@/i18nConfig'

interface Props {
  locale: Locale
}

export default function IsItALot({ locale }: Props) {
  return (
    <section className="mb-12 w-lg max-w-full">
      <h2>
        <Trans locale={locale} key="eau.resultats.isItALot.title">
          Est-ce que c'est beaucoup ?
        </Trans>
      </h2>
      <p>
        <Trans locale={locale} key="eau.resultats.isItALot.text1">
          En règle générale, les valeurs d'empreinte eau varient entre{' '}
          <strong>3 000 et 9 000 litres</strong> par jour. Contrairement au
          carbone, il n'existe pas d'objectif chiffré pour l'empreinte eau.
        </Trans>
      </p>

      <p>
        <Trans locale={locale} key="eau.resultats.isItALot.text2">
          Nous n'affichons pas la valeur par défaut en début de test. En effet,
          notre modèle eau étant le premier du genre en France, nous ne voulons
          pas qu'elle soit perçue comme la valeur moyenne nationale.
        </Trans>
      </p>
    </section>
  )
}
