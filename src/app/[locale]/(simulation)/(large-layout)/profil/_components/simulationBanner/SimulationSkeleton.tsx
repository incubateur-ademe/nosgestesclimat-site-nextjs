export default function SimulationSkeleton() {
  return (
    <div
      className="relative mt-10 flex-1 animate-pulse px-4"
      role="status"
      aria-label="Chargement de la simulation en cours"
      aria-live="polite">
      <div className="bg-primary-100 mb-4 h-80 w-full rounded-md"></div>
    </div>
  )
}
