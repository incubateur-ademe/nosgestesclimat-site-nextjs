import Trans from '@/components/translation/Trans'
import Emoji from '@/design-system/utils/Emoji'
import OrganisationDisclaimer from './avantDeCommencer/OrganisationDisclaimer'

export default function AvantDeCommencer() {
  return (
    <div className="border-rainbow relative mt-6 mb-8 flex flex-col rounded-xl bg-gray-100 p-7 md:mt-10">
      <div
        role="presentation"
        aria-hidden
        className="absolute -top-8 inline-block rounded-full bg-gray-100 p-4 text-3xl">
        <Emoji>💡</Emoji>
      </div>
      <h3 className="z-10">
        <Trans locale={locale}>Avant de commencer</Trans>
      </h3>
      <OrganisationDisclaimer />
      <div className="relative pl-8">
        <h4 className="relative overflow-visible font-bold">
          <Emoji className="absolute top-0 -left-8">🏡</Emoji>
          <Trans locale={locale}>C'est un test individuel !</Trans>
        </h4>
        <p className="text-sm md:text-base">
          <Trans locale={locale}>
            Répondez aux questions en votre nom, pas pour votre foyer.
          </Trans>
          <span className="hidden md:inline">
            {' '}
            <Trans locale={locale}>
              Bien sûr, certaines choses sont partagées (au sein de mon logement
              avec ma famille, la voiture avec les covoitureurs) : cela sera
              bien pris en compte dans le calcul de votre empreinte carbone, ne
              vous inquiétez pas !
            </Trans>
          </span>
        </p>
      </div>
      <div className="relative pl-8">
        <h4 className="relative overflow-visible font-bold">
          <Emoji className="absolute top-0 -left-8">👤</Emoji>
          <Trans locale={locale}>
            Il concerne votre vie personnelle, et non pas votre boulot.
          </Trans>
        </h4>
      </div>
    </div>
  )
}
