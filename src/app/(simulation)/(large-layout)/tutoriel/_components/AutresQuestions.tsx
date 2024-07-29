/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client'

import Trans from '@/components/translation/Trans'
import {
  tutorielClickFaq,
  tutorielClickQuestion,
} from '@/constants/tracking/pages/tutoriel'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { trackEvent } from '@/utils/matomo/trackEvent'
import Image from 'next/image'
import OrganisationPrivacy from './autresQuestions/OrganisationPrivacy'

export default function AutresQuestions() {
  return (
    <div className="order-last mb-8 md:order-none">
      <h5 className="mb-2 text-lg">
        <Trans>D'autres questions ?</Trans>
      </h5>
      <ul className="mb-1 list-none p-0">
        <OrganisationPrivacy />
        <li className="mb-2" id={'empreinte'}>
          <details>
            <summary
              className="cursor-pointer text-sm font-bold text-primary-700 md:text-lg"
              onClick={() =>
                trackEvent(
                  tutorielClickQuestion('C’est quoi mon empreinte carbone ?')
                )
              }>
              <Trans>C’est quoi mon empreinte carbone ?</Trans>
            </summary>
            <div className="my-2 ml-3.5">
              <p>
                <Trans i18nKey={'publicodes.Tutoriel.slide1.p1'}>
                  Le climat se réchauffe à cause des activités humaines, c'est
                  un fait. Tout ce que nous consommons, utilisons, puis jetons a
                  nécessité de la matière et de l'énergie. Que ce soit pour la
                  phase de production, d'utilisation, ou de fin de vie du bien,
                  ou du service. Ainsi, toutes nos activités participent à
                  émettre des gaz à effet de serre. Certaines énormément,
                  d'autres très peu. Mais quel est notre impact, à notre échelle
                  de citoyen ?
                </Trans>
              </p>
              <Image
                src="/images/tutoriel/greenhouse-effect.svg"
                alt="Effet de serre"
                className="mx-auto w-1/3"
                width={100}
                height={100}
              />
              <p>
                <Trans i18nKey={'publicodes.Tutoriel.slide1.p2'}>
                  Pour estimer sa propre contribution au réchauffement de la
                  planète (son "impact climat"), il est d'usage de calculer ce
                  qu'on appelle l'empreinte carbone individuelle de
                  consommation.
                </Trans>
              </p>
            </div>
          </details>
        </li>
        <li className="mb-2" id={'mesure'}>
          <details>
            <summary
              className="cursor-pointer text-sm font-bold text-primary-700 md:text-lg"
              onClick={() =>
                trackEvent(tutorielClickQuestion('Comment on la mesure ?'))
              }>
              <Trans>Comment on la mesure ?</Trans>
            </summary>
            <div className="my-2 ml-3.5">
              <p>
                <Trans i18nKey={'publicodes.Tutoriel.slide2.p1'}>
                  Avec une unité au nom barbare : l'équivalent CO₂. Le dioxyde
                  de carbone{' '}
                  <Image
                    src="/images/tutoriel/co2.svg"
                    alt="CO2"
                    className="inline-block w-8"
                    width={100}
                    height={100}
                  />
                  , vous le connaissez : on l'expire toute la journée, mais sans
                  influence sur le climat.
                </Trans>
              </p>
              <Image
                src="/images/tutoriel/co2e.svg"
                alt="CO2E"
                className="mx-auto mb-2 w-24"
                width={100}
                height={100}
              />
              <p>
                <Trans i18nKey={'publicodes.Tutoriel.slide2.p2'}>
                  Ce sont les machines qui font notre confort moderne qui en
                  rejettent massivement, à tel point qu'on le compte en milliers
                  de kilos par an et par personne, donc en{' '}
                  <strong>tonnes</strong> de CO₂e !
                </Trans>
              </p>
              <blockquote>
                <details>
                  <summary
                    onClick={() =>
                      trackEvent(
                        tutorielClickQuestion('Mais que veut dire ce petit e ?')
                      )
                    }>
                    <Trans i18nKey={'sites.publicodes.Tutorial.questionE'}>
                      💡 Mais que veut dire ce petit <em>e</em> ?
                    </Trans>
                  </summary>{' '}
                  <Trans i18nKey={'publicodes.Tutoriel.slide2.blockquote'}>
                    D'autres gaz, surtout le méthane{' '}
                    <Image
                      src="/images/tutoriel/methane.svg"
                      alt="methane"
                      className="inline-block w-8"
                      width={100}
                      height={100}
                    />{' '}
                    et le protoxyde d'azote{' '}
                    <Image
                      src="/images/tutoriel/n2o.svg"
                      alt="N2O"
                      className="inline-block w-8"
                      width={100}
                      height={100}
                    />{' '}
                    réchauffent aussi la planète : on convertit leur potentiel
                    de réchauffement en équivalent CO₂ pour simplifier la
                    mesure.{' '}
                  </Trans>
                </details>
              </blockquote>
            </div>
          </details>
        </li>
        <li className="mb-4" id={'categories'}>
          <details id={'categories'}>
            <summary
              className="cursor-pointer text-sm font-bold text-primary-700 md:text-lg"
              onClick={() =>
                trackEvent(tutorielClickQuestion('D’où vient mon empreinte ?'))
              }>
              <Trans>D’où vient mon empreinte ?</Trans>
            </summary>
            <div className="my-2 ml-3.5">
              <Trans i18nKey={'publicodes.Tutoriel.slide6'}>
                <p>
                  Prendre la voiture, manger un steak, chauffer sa maison, se
                  faire soigner, acheter une TV...
                </p>

                <p>
                  L'empreinte de notre consommation individuelle, c'est la somme
                  de toutes ces activités qui font notre vie moderne.{' '}
                </p>
              </Trans>
            </div>
          </details>
        </li>
      </ul>
      <ButtonLink
        href="/questions-frequentes"
        size="sm"
        color="secondary"
        trackingEvent={tutorielClickFaq}>
        ☝️ <Trans>Consultez la FAQ</Trans>
      </ButtonLink>
    </div>
  )
}
