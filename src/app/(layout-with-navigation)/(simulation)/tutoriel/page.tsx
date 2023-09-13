import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import Image from 'next/image'
import ButtonStart from './_components/ButtonStart'
import co2 from './_components/co2.svg'
import co2e from './_components/co2e.svg'
import greenhouseeffect from './_components/greenhouse-effect.svg'
import methane from './_components/methane.svg'
import n2o from './_components/n2o.svg'

export default function Tutoriel() {
  return (
    <>
      <Title
        data-cypress-id="tutoriel-title"
        title={
          <span className="">
            <span className="inline text-secondary">
              <Trans>10 minutes</Trans>
            </span>{' '}
            <Trans>chrono pour calculer votre empreinte sur le climat</Trans>
          </span>
        }
      />
      <div className="relative mb-8 mt-10 bg-grey-100 p-7">
        <div
          role="presentation"
          aria-hidden
          className="absolute -top-8 inline-block rounded-full bg-grey-100 p-4 text-3xl">
          💡
        </div>
        <h3>
          <Trans>Avant de commencer</Trans>
        </h3>
        <div className="relative pl-8">
          <h4 className="overflow-visible font-bold before:absolute before:left-0 before:content-['🏡'] ">
            <Trans>C'est un test individuel !</Trans>
          </h4>
          <p>
            <Trans>
              Répondez aux questions en votre nom, pas pour votre foyer. Bien
              sûr, certaines choses sont partagées (au sein de mon logement avec
              ma famille, la voiture avec les covoitureurs) : cela sera bien
              pris en compte dans le calcul de votre empreinte carbone, ne vous
              inquiétez pas !
            </Trans>
          </p>
        </div>
        <div className="relative pl-8">
          <h4 className="overflow-visible font-bold before:absolute before:left-0 before:content-['👤'] ">
            <Trans>
              Il concerne votre vie personnelle, et non pas votre boulot.
            </Trans>
          </h4>
        </div>
      </div>
      <div className="mb-8 border-b border-gray-200 pb-8">
        <h5 className="mb-2 text-lg">D’autres questions ?</h5>
        <ul className="mb-1 list-none p-0">
          <li className="mb-2" id={'empreinte'}>
            <details>
              <summary className="cursor-pointer text-lg font-bold text-primary">
                <Trans>C’est quoi mon empreinte carbone ?</Trans>
              </summary>
              <div className="my-2 ml-3.5">
                <Trans i18nKey={'publicodes.Tutoriel.slide1.p1'}>
                  <p>
                    Le climat se réchauffe à cause des activités humaines, c'est
                    un fait. Tout ce que nous consommons, utilisons, puis jetons
                    a nécessité de la matière et de l'énergie. Que ce soit pour
                    la phase de production, d'utilisation, ou de fin de vie du
                    bien, ou du service. Ainsi, toutes nos activités participent
                    à émettre des gaz à effet de serre. Certaines énormément,
                    d'autres très peu. Mais quel est notre impact, à notre
                    échelle de citoyen ?
                  </p>
                </Trans>
                <Image
                  src={greenhouseeffect}
                  alt="Effet de serre"
                  className="mx-auto w-1/3"
                />
                <Trans i18nKey={'publicodes.Tutoriel.slide1.p2'}>
                  <p>
                    Pour estimer sa propre contribution au réchauffement de la
                    planète (son "impact climat"), il est d'usage de calculer ce
                    qu'on appelle l'empreinte carbone individuelle de
                    consommation.
                  </p>
                </Trans>
              </div>
            </details>
          </li>
          <li className="mb-2" id={'mesure'}>
            <details>
              <summary className="cursor-pointer text-lg font-bold text-primary">
                <Trans>Comment on la mesure ?</Trans>
              </summary>
              <div className="my-2 ml-3.5">
                <p>
                  <Trans i18nKey={'publicodes.Tutoriel.slide2.p1'}>
                    Avec une unité au nom barbare : l'équivalent CO₂. Le dioxyde
                    de carbone{' '}
                    <Image src={co2} alt="CO2" className="inline-block w-8" />,
                    vous le connaissez : on l'expire toute la journée, mais sans
                    influence sur le climat.
                  </Trans>
                </p>
                <Image src={co2e} alt="CO2E" className="mx-auto mb-2 w-24" />
                <p>
                  <Trans i18nKey={'publicodes.Tutoriel.slide2.p2'}>
                    Ce sont les machines qui font notre confort moderne qui en
                    rejettent massivement, à tel point qu'on le compte en
                    milliers de kilos par an et par personne, donc en{' '}
                    <strong>tonnes</strong> de CO₂e !
                  </Trans>
                </p>
                <blockquote>
                  <details>
                    <summary>
                      <Trans i18nKey={'sites.publicodes.Tutorial.questionE'}>
                        💡 Mais que veut dire ce petit <em>e</em> ?
                      </Trans>
                    </summary>{' '}
                    <Trans i18nKey={'publicodes.Tutoriel.slide2.blockquote'}>
                      D'autres gaz, surtout le méthane{' '}
                      <Image
                        src={methane}
                        alt="methane"
                        className="inline-block w-8"
                      />{' '}
                      et le protoxyde d'azote{' '}
                      <Image src={n2o} alt="N2O" className="inline-block w-8" />{' '}
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
              <summary className="cursor-pointer text-lg font-bold text-primary">
                <Trans>D’où vient mon empreinte ?</Trans>
              </summary>
              <div className="my-2 ml-3.5">
                <Trans i18nKey={'publicodes.Tutoriel.slide6'}>
                  <p>
                    Prendre la voiture, manger un steak, chauffer sa maison, se
                    faire soigner, acheter une TV...
                  </p>

                  <p>
                    L'empreinte de notre consommation individuelle, c'est la
                    somme de toutes ces activités qui font notre vie moderne.{' '}
                  </p>
                </Trans>
              </div>
            </details>
          </li>
        </ul>
        <ButtonLink href="/questions-frequentes" size="sm" color="secondary">
          ☝️ <Trans>Consultez la FAQ</Trans>
        </ButtonLink>
      </div>
      <div className="flex justify-between">
        <ButtonLink href="/" color="secondary">
          ←
        </ButtonLink>
        <ButtonStart />
      </div>
    </>
  )
}
