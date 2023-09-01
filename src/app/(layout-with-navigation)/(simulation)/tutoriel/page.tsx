import TransServer from '@/components/translation/TransServer'
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
            <span className="text-secondary inline">
              <TransServer>10 minutes</TransServer>
            </span>{' '}
            <TransServer>
              chrono pour calculer votre empreinte sur le climat
            </TransServer>
          </span>
        }
      />
      <div className="bg-grey-100 p-7 relative mt-10 mb-8">
        <div
          role="presentation"
          aria-hidden
          className="absolute -top-8 p-4 bg-grey-100 rounded-full inline-block text-3xl">
          💡
        </div>
        <h3>
          <TransServer>Avant de commencer</TransServer>
        </h3>
        <div className="relative pl-8">
          <h4 className="font-bold before:content-['🏡'] before:absolute before:left-0 overflow-visible ">
            <TransServer>C'est un test individuel !</TransServer>
          </h4>
          <p>
            <TransServer>
              Répondez aux questions en votre nom, pas pour votre foyer. Bien
              sûr, certaines choses sont partagées (au sein de mon logement avec
              ma famille, la voiture avec les covoitureurs) : cela sera bien
              pris en compte dans le calcul de votre empreinte carbone, ne vous
              inquiétez pas !
            </TransServer>
          </p>
        </div>
        <div className="relative pl-8">
          <h4 className="font-bold before:content-['👤'] before:absolute before:left-0 overflow-visible ">
            <TransServer>
              Il concerne votre vie personnelle, et non pas votre boulot.
            </TransServer>
          </h4>
        </div>
      </div>
      <div className="mb-8 pb-8 border-b border-gray-200">
        <h5 className="mb-2 text-lg">D’autres questions ?</h5>
        <ul className="list-none p-0 mb-1">
          <li className="mb-2" id={'empreinte'}>
            <details>
              <summary className="text-lg font-bold text-primary cursor-pointer">
                <TransServer>C’est quoi mon empreinte carbone ?</TransServer>
              </summary>
              <div className="ml-3.5 my-2">
                <TransServer i18nKey={'publicodes.Tutoriel.slide1.p1'}>
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
                </TransServer>
                <Image
                  src={greenhouseeffect}
                  alt="Effet de serre"
                  className="w-1/3 mx-auto"
                />
                <TransServer i18nKey={'publicodes.Tutoriel.slide1.p2'}>
                  <p>
                    Pour estimer sa propre contribution au réchauffement de la
                    planète (son "impact climat"), il est d'usage de calculer ce
                    qu'on appelle l'empreinte carbone individuelle de
                    consommation.
                  </p>
                </TransServer>
              </div>
            </details>
          </li>
          <li className="mb-2" id={'mesure'}>
            <details>
              <summary className="text-lg font-bold text-primary cursor-pointer">
                <TransServer>Comment on la mesure ?</TransServer>
              </summary>
              <div className="ml-3.5 my-2">
                <p>
                  <TransServer i18nKey={'publicodes.Tutoriel.slide2.p1'}>
                    Avec une unité au nom barbare : l'équivalent CO₂. Le dioxyde
                    de carbone{' '}
                    <Image src={co2} alt="CO2" className="w-8 inline-block" />,
                    vous le connaissez : on l'expire toute la journée, mais sans
                    influence sur le climat.
                  </TransServer>
                </p>
                <Image src={co2e} alt="CO2E" className="w-24 mx-auto mb-2" />
                <p>
                  <TransServer i18nKey={'publicodes.Tutoriel.slide2.p2'}>
                    Ce sont les machines qui font notre confort moderne qui en
                    rejettent massivement, à tel point qu'on le compte en
                    milliers de kilos par an et par personne, donc en{' '}
                    <strong>tonnes</strong> de CO₂e !
                  </TransServer>
                </p>
                <blockquote>
                  <details>
                    <summary>
                      <TransServer
                        i18nKey={'sites.publicodes.Tutorial.questionE'}>
                        💡 Mais que veut dire ce petit <em>e</em> ?
                      </TransServer>
                    </summary>{' '}
                    <TransServer
                      i18nKey={'publicodes.Tutoriel.slide2.blockquote'}>
                      D'autres gaz, surtout le méthane{' '}
                      <Image
                        src={methane}
                        alt="methane"
                        className="w-8 inline-block"
                      />{' '}
                      et le protoxyde d'azote{' '}
                      <Image src={n2o} alt="N2O" className="w-8 inline-block" />{' '}
                      réchauffent aussi la planète : on convertit leur potentiel
                      de réchauffement en équivalent CO₂ pour simplifier la
                      mesure.{' '}
                    </TransServer>
                  </details>
                </blockquote>
              </div>
            </details>
          </li>
          <li className="mb-4" id={'categories'}>
            <details id={'categories'}>
              <summary className="text-lg font-bold text-primary cursor-pointer">
                <TransServer>D’où vient mon empreinte ?</TransServer>
              </summary>
              <div className="ml-3.5 my-2">
                <TransServer i18nKey={'publicodes.Tutoriel.slide6'}>
                  <p>
                    Prendre la voiture, manger un steak, chauffer sa maison, se
                    faire soigner, acheter une TV...
                  </p>

                  <p>
                    L'empreinte de notre consommation individuelle, c'est la
                    somme de toutes ces activités qui font notre vie moderne.{' '}
                  </p>
                </TransServer>
              </div>
            </details>
          </li>
        </ul>
        <ButtonLink href="/questions-frequentes" size="sm" color="secondary">
          ☝️ <TransServer>Consultez la FAQ</TransServer>
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
