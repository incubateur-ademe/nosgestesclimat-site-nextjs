import TitleDescLinkBlock from '@/components/landing-pages/TitleDescLinkBlock'
import Trans from '@/components/translation/trans/TransServer'

export default function ModelInfo() {
  return (
    <div className="bg-heroLightBackground px-4 py-12 md:py-20">
      <div className="flex flex-col items-center gap-10 md:mx-auto md:max-w-5xl">
        <h2 className="text-center text-2xl md:text-3xl">
          <Trans>Un modèle de calcul fiable</Trans>
        </h2>

        <div className="flex flex-col gap-16 md:flex-row md:gap-10">
          <TitleDescLinkBlock
            title={<Trans>Basé sur les données de l’ADEME</Trans>}
            description={
              <>
                <Trans>Retrouvez toute l’expertise de</Trans>{' '}
                <strong className="text-primary-600">
                  <Trans>l’Agence de la Transition Écologique</Trans>
                </strong>{' '}
                <Trans>
                  dans le calculateur de Nos Gestes Climat : données,
                  perspectives, leviers d'action.
                </Trans>
              </>
            }
            link={{
              href: '/documentation',
              text: <Trans>Découvrir la documentation</Trans>,
            }}
          />

          <TitleDescLinkBlock
            title={<Trans>Libre et documenté</Trans>}
            description={
              <Trans>
                Les lignes de code, les données et même une grande partie des
                réflexions méthodologiques derrière le calculateur sont toutes{' '}
                <strong className="text-primary-600">accessibles</strong>, ce
                qui permet à qui veut de{' '}
                <strong className="text-primary-600">
                  contribuer et améliorer l’outil
                </strong>
                .
              </Trans>
            }
            link={{
              href: '/nouveautes',
              text: <Trans>Voir les nouveautés</Trans>,
            }}
          />
        </div>
      </div>
    </div>
  )
}
