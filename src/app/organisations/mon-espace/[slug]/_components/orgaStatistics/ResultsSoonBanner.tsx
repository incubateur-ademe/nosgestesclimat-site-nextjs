import HourglassIcon from '@/components/icons/HourglassIcon'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'

export default function ResultsSoonBanner() {
  function handleClick() {
    const faqElement = document.getElementById('orga-faq')

    faqElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <Card className="w-full flex-row gap-4">
      <div className="flex gap-4">
        <HourglassIcon />
        <p>
          <Trans>
            Bientôt, vous verrez apparaître ici vos statistiques. Partagez le
            test pour obtenir vos premiers résultats
          </Trans>{' '}
          -{' '}
          <Button color="text" className="underline" onClick={handleClick}>
            <Trans>En savoir plus</Trans>
          </Button>
        </p>
      </div>

      <Button color="text">Partagez le test</Button>
    </Card>
  )
}
