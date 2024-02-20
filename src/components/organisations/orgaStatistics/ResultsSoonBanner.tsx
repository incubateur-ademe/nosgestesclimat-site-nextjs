'use client'

import HourglassIcon from '@/components/icons/HourglassIcon'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import { usePathname } from 'next/navigation'

export default function ResultsSoonBanner() {
  const pathname = usePathname()

  const isResultatsDetailles = pathname.includes('resultats-detailles')

  function handleScrollIntoView(id: string) {
    const shareSection = document.getElementById(id)

    shareSection?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })

    if (!shareSection) return

    shareSection.style.backgroundColor = '#E8DFEE'

    setTimeout(() => {
      shareSection.style.backgroundColor = '#FFFFFF'
    }, 700)
  }

  return (
    <div className="absolute left-0 top-0 z-10 h-full w-full p-10 pb-0">
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-white opacity-50" />

      <Card className="w-full flex-row flex-wrap items-center justify-between gap-4 p-8 md:flex-nowrap">
        <div className="flex max-w-2xl gap-4">
          <HourglassIcon />
          <div className="flex items-center">
            <p className="mb-0">
              <span>
                <Trans>
                  Bientôt, vous verrez apparaître ici vos statistiques.
                </Trans>
              </span>
              {!isResultatsDetailles && (
                <span>
                  <Trans>
                    Partagez le test pour obtenir vos premiers résultats
                  </Trans>
                </span>
              )}
            </p>
          </div>
        </div>
        {!isResultatsDetailles && (
          <button
            className="whitespace-nowrap font-bold text-primary-500 underline"
            onClick={() => handleScrollIntoView('orga-partage')}>
            Partagez le test
          </button>
        )}
      </Card>
    </div>
  )
}
