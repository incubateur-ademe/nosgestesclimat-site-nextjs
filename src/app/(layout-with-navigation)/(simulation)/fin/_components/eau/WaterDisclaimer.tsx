import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'

export default function WaterDisclaimer() {
  return (
    <div>
      <Title tag="h2">
        <Trans>
          Est-ce que c'est{' '}
          <strong className="text-secondary-700">beaucoup ?</strong>
        </Trans>
      </Title>
      <p>
        <Trans>
          <p>
            En règle générale, les valeurs d'empreinte eau varient{' '}
            <strong className="text-secondary-700">
              entre 9000 et 15000 litres par jour
            </strong>
            . Contrairement au carbone, il n'existe pas d'objectif chiffré pour
            l'empreinte eau.
          </p>
          <p>
            Nous n'affichons pas la valeur par défaut en début de test. En
            effet, notre modèle eau étant le premier du genre en France, nous ne
            voulons pas qu'elle soit perçue comme la valeur moyenne nationale.
          </p>
        </Trans>
      </p>
    </div>
  )
}
