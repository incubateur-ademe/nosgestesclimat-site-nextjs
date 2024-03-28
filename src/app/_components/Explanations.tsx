import Trans from '@/components/translation/Trans'
import { homeClickEnSavoirPlus } from '@/constants/tracking/pages/home'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default async function Explanations() {
  const { t } = await getServerTranslation()

  return (
    <div className="mx-auto mb-12 w-full max-w-3xl px-4 md:mb-24">
      <Title tag="h2" className="font-medium md:text-3xl">
        {t(`L'empreinte climat, qu'est-ce que c'est\u202f?`)}
      </Title>
      <p className="md:text-lg">
        <Trans>
          Le climat se réchauffe à cause des activités humaines, c'est un fait.
          Mais quel est notre impact, à notre échelle de citoyen Pour estimer sa
          propre contribution au réchauffement de la planète (son "impact
          climat"), il est d'usage de calculer l'empreinte carbone individuelle
          de consommation.
        </Trans>
      </p>
      <p className="md:text-lg">
        <Trans>
          Le principe est simple : pour chaque consommation (prendre sa voiture
          pour 10km, manger un steak, chauffer sa maison au gaz...), on décompte
          les émissions de gaz à effet de serre (les différents gaz qui
          réchauffent le climat terrestre) sur son cycle de vie. Par exemple, un
          bien acheté est fabriqué, puis utilisé, puis jeté et peut-être
          recyclé.
        </Trans>
      </p>
      <p className="md:mb-8 md:text-lg">
        <Trans>
          Au fil des questions portant sur tous les aspects de nos modes de vie,
          découpés en grands postes comme l’alimentation, le logement, ou le
          transport, le poids de chacune de vos consommations est ajouté pour
          constituer votre total, le bilan carbone personnel, à visualiser sur
          trois infographies.
        </Trans>
      </p>
      <ButtonLink
        color="secondary"
        href="/blog/budget"
        data-cypress-id="budget-link"
        onClick={() => trackEvent(homeClickEnSavoirPlus)}>
        <Trans>En savoir plus</Trans>
      </ButtonLink>
    </div>
  )
}
