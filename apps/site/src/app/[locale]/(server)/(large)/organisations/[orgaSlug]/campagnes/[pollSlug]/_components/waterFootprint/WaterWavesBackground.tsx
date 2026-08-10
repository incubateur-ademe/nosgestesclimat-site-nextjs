/**
 * Décor purement visuel : deux vagues stylisées, positionnées en haut à droite
 * de la carte "empreinte eau" de la page de résultats de campagne.
 *
 * Le composant parent doit être en `position: relative` et `overflow: hidden`.
 */
export default function WaterWavesBackground() {
  return (
    <div
      aria-hidden="true"
      data-testid="water-waves-background"
      className="pointer-events-none absolute -top-2 right-0 h-24 w-1/2 rotate-20 md:h-32 md:w-2/5">
      <svg
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-primary-100 h-full w-full -translate-y-[18%] scale-175">
        <path d="M0,40 C30,10 60,70 100,40 C140,10 170,70 200,40 L200,0 L0,0 Z" />
      </svg>
    </div>
  )
}
