import Trans from '@/components/translation/Trans'
import { homeClickEnSavoirPlus } from '@/constants/tracking/pages/home'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function Explanations() {
  const { t } = await getServerTranslation()

  return (
    <div className="mx-auto mb-12 w-full max-w-3xl px-4 md:mb-24">
      <Title tag="h2" className="font-medium md:text-3xl">
        {t(`L'empreinte climat, qu'est-ce que c'est\u202f?`)}
      </Title>

      <p className="md:text-lg">
        <Trans>
          Depuis le siècle dernier,{' '}
          <strong className="text-primary-700">
            la concentration du carbone dans l’atmosphère augmente
          </strong>{' '}
          tant et si bien que le climat de la planète subit des bouleversements
          aux lourdes conséquences : montée des eaux, destruction du vivant,
          explosion des catastrophes climatiques.
        </Trans>
      </p>

      <p className="md:text-lg">
        <Trans>
          Le consensus scientifique est formel, cette augmentation est{' '}
          <strong className="text-primary-700">
            directement liée aux activités humaines :
          </strong>{' '}
          l’extraction, la consommation et la combustion de ressources dépassent
          les capacités d’absorption de notre planète.{' '}
          <strong className="text-primary-700">
            Il est grand temps de réduire ou remplacer
          </strong>{' '}
          ces activités émettrices de gaz à effet de serre, à toutes les
          échelles !
        </Trans>
      </p>

      <p className="md:mb-8 md:text-lg">
        <Trans>
          Le simulateur d’empreinte carbone individuelle permet de comprendre
          quels sont nos usages qui contribuent le plus au changement
          climatique, et de saisir les actions qui auraient le plus d’impact
          pour le réduire.
        </Trans>
      </p>

      <ButtonLink
        color="secondary"
        href="/empreinte-climat"
        data-cypress-id="budget-link"
        trackingEvent={homeClickEnSavoirPlus}>
        <Trans>En savoir plus</Trans>
      </ButtonLink>
    </div>
  )
}
