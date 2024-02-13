import HourglassIcon from '@/components/icons/HourglassIcon'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'

export default function ResultsSoonBanner() {
  function handleScrollIntoView(id: string) {
    const faqElement = document.getElementById(id)

    faqElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }

  return (
    <div className="absolute left-0 top-0 z-10 h-full w-full p-10 pb-0">
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-white opacity-50" />

      <Card className="w-full flex-row flex-wrap items-center justify-between gap-4 p-8 md:flex-nowrap">
        <div className="flex max-w-2xl gap-4">
          <HourglassIcon />
          <div>
            <p className="mb-0">
              <Trans>
                Bientôt, vous verrez apparaître ici vos statistiques. Partagez
                le test pour obtenir vos premiers résultats
              </Trans>{' '}
            </p>
          </div>
        </div>

        <button
          className="whitespace-nowrap font-bold text-primary-500 underline"
          onClick={() => handleScrollIntoView('orga-partage')}>
          Partagez le test
        </button>
      </Card>
    </div>
  )
}
