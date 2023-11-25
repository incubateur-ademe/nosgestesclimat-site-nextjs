import Trans from '@/components/translation/Trans'

export default function AvantDeCommencer() {
  return (
    <div className="relative mb-8 mt-6 flex flex-col rounded-md bg-grey-100 p-7 md:mt-10">
      <div
        role="presentation"
        aria-hidden
        className="absolute -top-8 inline-block rounded-full bg-grey-100 p-4 text-3xl">
        💡
      </div>
      <h3 className="z-10">
        <Trans>Avant de commencer</Trans>
      </h3>
      <div className="relative pl-8">
        <h4 className="overflow-visible font-bold before:absolute before:left-0 before:content-['🏡'] ">
          <Trans>C'est un test individuel !</Trans>
        </h4>
        <p className="text-sm md:text-base">
          <Trans>
            Répondez aux questions en votre nom, pas pour votre foyer.
          </Trans>
          <span className="hidden md:inline">
            {' '}
            <Trans>
              Bien sûr, certaines choses sont partagées (au sein de mon logement
              avec ma famille, la voiture avec les covoitureurs) : cela sera
              bien pris en compte dans le calcul de votre empreinte carbone, ne
              vous inquiétez pas !
            </Trans>
          </span>
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
  )
}
