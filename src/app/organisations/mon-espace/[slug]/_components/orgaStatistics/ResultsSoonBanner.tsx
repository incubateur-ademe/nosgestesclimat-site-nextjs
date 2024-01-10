import HourglassIcon from '@/components/icons/HourglassIcon'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'

export default function ResultsSoonBanner() {
  function handleScrollIntoView(id: string) {
    const faqElement = document.getElementById(id)

    faqElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <Card className="w-full flex-row flex-wrap items-center justify-between gap-4 p-8 md:flex-nowrap">
      <div className="flex max-w-2xl gap-4">
        <HourglassIcon />
        <div>
          <p className="mb-0">
            <Trans>
              Bientôt, vous verrez apparaître ici vos statistiques. Partagez le
              test pour obtenir vos premiers résultats
            </Trans>{' '}
            -{' '}
            <button
              className="text-primary-500 underline"
              onClick={() => handleScrollIntoView('orga-faq')}>
              <Trans>En savoir plus</Trans>
            </button>
          </p>
        </div>
      </div>

      <button
        className="whitespace-nowrap font-bold text-primary-500 underline"
        onClick={() => handleScrollIntoView('orga-partage')}>
        Partagez le test
      </button>
    </Card>
  )
}
