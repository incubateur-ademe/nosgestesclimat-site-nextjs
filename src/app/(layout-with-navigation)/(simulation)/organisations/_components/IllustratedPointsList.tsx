import Trans from '@/components/translation/Trans'
import Image from 'next/image'
import VisuelIframe from './VisuelIframe'

export default function IllustratedPointsList() {
  return (
    <ul className="flex flex-col gap-28">
      <li>
        <section className="flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-full md:mx-auto md:w-[34rem]">
            <h2 className="mb-2 text-base text-pink-600">
              <Trans>Campagne personnalisée</Trans>
            </h2>

            <h3 className="text-2xl leading-10 md:text-3xl">
              <Trans>Lancez une campagne Nos Gestes Climat personnalisée</Trans>
            </h3>

            <p className="text-base md:text-lg">
              <Trans>
                Créez une campagne Nos Gestes Climat personnalisée au sein de
                votre organisation et accédez à un kit clé en main pour
                sensibiliser vos partenaires au sein de votre organisation.
              </Trans>
            </p>
          </div>

          <div className="mx-auto flex max-w-full items-end overflow-hidden rounded-xl bg-gray-100 px-6 pt-6 md:w-[26rem]">
            <div className="mx-auto mt-4 flex items-end rounded-t-md bg-white p-4 pb-0 shadow-sm">
              <Image
                src="/images/organisations/tutoriel.png"
                width="300"
                height="200"
                alt=""
              />
            </div>
          </div>
        </section>
      </li>

      <li>
        <section className="flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-full md:mx-auto md:w-[34rem]">
            <h2 className="mb-2 text-base text-pink-600">
              <Trans>Tableau de bord</Trans>
            </h2>

            <h3 className="text-2xl leading-10 md:text-3xl">
              <Trans>Explorez, comparez et analysez vos données</Trans>
            </h3>

            <p className="text-base md:text-lg">
              <Trans>
                Explorez, analysez et téléchargez des données anonymisées pour
                faire des choix éclairés et améliorer continuellement votre
                démarche écologique. Avec nos exports sur mesure, partagez vos
                réussites et vos challenges avec vos équipes et parties
                prenantes pour une stratégie de durabilité unifiée.
              </Trans>
            </p>
          </div>

          <div className="mx-auto flex max-w-full items-end overflow-hidden rounded-xl bg-gray-100 px-6 pt-6 md:w-[26rem]">
            <div className="w-full">
              <Image
                src="/images/organisations/orga-visuel-2.png"
                width="360"
                height="500"
                alt=""
              />
            </div>
          </div>
        </section>
      </li>

      <li>
        <section className="flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-full md:mx-auto md:w-[34rem]">
            <h2 className="mb-2 text-base text-pink-600">
              <Trans>Lien personnalisé & iframes</Trans>
            </h2>

            <h3 className="text-2xl leading-10 md:text-3xl">
              <Trans>
                Intégrez Nos Gestes Climat directement à vos services
              </Trans>
            </h3>

            <p className="text-base md:text-lg">
              <Trans>
                Permettez à vos cibles (clients, étudiants, participants,
                habitants..) de calculer et réduire leur empreinte carbone
                directement depuis vos plateformes web et mobile, avec un lien
                dédié ou d’autres modes d’intégration prêts à l’emploi.
              </Trans>
            </p>
          </div>

          <div className="mx-auto flex w-[26rem] max-w-full items-end overflow-hidden rounded-xl bg-gray-100 px-6 pt-6 md:w-[26rem]">
            <VisuelIframe />
          </div>
        </section>
      </li>
    </ul>
  )
}
