import NewTabSvg from '@/components/icons/NewTabSvg'
import RegionGrid from '@/components/misc/RegionGrid'
import TransClient from '@/components/translation/TransClient'
import Card from '@/design-system/layout/Card'
import { sortSupportedRegions } from '@/helpers/localisation/sortSupportedRegions'
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/publicodes-state'
import { SuppportedRegions } from '@/types/international'

type Props = {
  open?: boolean
  supportedRegions: SuppportedRegions
}

export default function RegionSelector({
  open = false,
  supportedRegions,
}: Props) {
  const locale = useLocale()

  const orderedSupportedRegions = sortSupportedRegions({
    supportedRegions,
    currentLocale: locale || 'fr',
  })

  const numberOfRegions = Object.entries(orderedSupportedRegions).length

  const { updateRegion, user } = useUser()

  const { region } = user || {}

  return (
    <>
      <details open={open}>
        <summary className="rounded-md p-4 w-auto cursor-pointer bg-primaryLight">
          🗺️ <TransClient>Choisir une autre région</TransClient>
          &nbsp;
          <small title={`${numberOfRegions} régions`}>
            ({numberOfRegions} <TransClient>disponibles</TransClient>)
          </small>
        </summary>
        <RegionGrid
          updateCurrentRegion={(code: string) => {
            updateRegion({
              code,
              name: supportedRegions[code][locale as string]
                ?.nom as unknown as string,
            })
          }}
          selectedRegionCode={region?.code}
        />
        <Card className="items-center mt-4">
          <span
            role="img"
            aria-label="emoji world"
            aria-hidden
            className="mr-2">
            🌐
          </span>
          <p className="mb-0">
            <TransClient>
              Envie de contribuer à une version pour votre région ?
            </TransClient>{' '}
            <a
              target="_blank"
              className="align-top"
              href="https://github.com/datagir/nosgestesclimat/blob/master/INTERNATIONAL.md">
              <TransClient>Suivez le guide !</TransClient>
              <NewTabSvg className="!-mt-1" />
            </a>
          </p>
        </Card>
      </details>
    </>
  )
}
