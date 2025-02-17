import TransClient from '@/components/translation/trans/TransClient'
import Emoji from '@/design-system/utils/Emoji'
import OrganisationDisclaimer from './avantDeCommencer/OrganisationDisclaimer'

export default function AvantDeCommencer() {
  return (
    <div className="border-rainbow relative mb-8 mt-6 flex flex-col rounded-xl bg-gray-100 p-7 md:mt-10">
      <div
        role="presentation"
        aria-hidden
        className="absolute -top-8 inline-block rounded-full bg-gray-100 p-4 text-3xl">
        <Emoji>💡</Emoji>
      </div>
      <h3 className="z-10">
        <TransClient>Avant de commencer</TransClient>
      </h3>
      <OrganisationDisclaimer />
      <div className="relative pl-8">
        <h4 className="relative overflow-visible font-bold">
          <Emoji className="absolute -left-8 top-0">🏡</Emoji>
          <TransClient>C'est un test individuel !</TransClient>
        </h4>
        <p className="text-sm md:text-base">
          <TransClient>
            Répondez aux questions en votre nom, pas pour votre foyer.
          </TransClient>
          <span className="hidden md:inline">
            {' '}
            <TransClient>
              Bien sûr, certaines choses sont partagées (au sein de mon logement
              avec ma famille, la voiture avec les covoitureurs) : cela sera
              bien pris en compte dans le calcul de votre empreinte carbone, ne
              vous inquiétez pas !
            </TransClient>
          </span>
        </p>
      </div>
      <div className="relative pl-8">
        <h4 className="relative overflow-visible font-bold">
          <Emoji className="absolute -left-8 top-0">👤</Emoji>
          <TransClient>
            Il concerne votre vie personnelle, et non pas votre boulot.
          </TransClient>
        </h4>
      </div>
    </div>
  )
}
