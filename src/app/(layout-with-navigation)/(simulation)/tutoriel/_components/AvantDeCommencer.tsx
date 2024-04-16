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
        <NGCTrans>Avant de commencer</NGCTrans>
      </h3>
      <OrganisationDisclaimer />
      <div className="relative pl-8">
        <h4 className="relative overflow-visible font-bold">
          <Emoji className="absolute -left-8 top-0">🏡</Emoji>
          <NGCTrans>C'est un test individuel !</NGCTrans>
        </h4>
        <p className="text-sm md:text-base">
          <NGCTrans>
            Répondez aux questions en votre nom, pas pour votre foyer.
          </NGCTrans>
          <span className="hidden md:inline">
            {' '}
            <NGCTrans>
              Bien sûr, certaines choses sont partagées (au sein de mon logement
              avec ma famille, la voiture avec les covoitureurs) : cela sera
              bien pris en compte dans le calcul de votre empreinte carbone, ne
              vous inquiétez pas !
            </NGCTrans>
          </span>
        </p>
      </div>
      <div className="relative pl-8">
        <h4 className="relative overflow-visible font-bold">
          <Emoji className="absolute -left-8 top-0">👤</Emoji>
          <NGCTrans>
            Il concerne votre vie personnelle, et non pas votre boulot.
          </NGCTrans>
        </h4>
      </div>
    </div>
  )
}
