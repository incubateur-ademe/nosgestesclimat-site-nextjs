import Trans from '@/components/translation/trans/TransServer'
import Switch from '@/design-system/inputs/Switch'
import Emoji from '@/design-system/utils/Emoji'
import { getLocale } from '@/helpers/getLocale'
import { getServerTranslation } from '@/helpers/getServerTranslation'

interface Props {
  currentPage: 'carbone' | 'eau'
  basePathname: string
}

export default async function FootprintsLinks({
  currentPage,
  basePathname,
}: Props) {
  const locale = await getLocale()
  const { t } = await getServerTranslation()

  return (
    <div className="mb-6 text-center md:mb-8 md:text-right">
      <Switch
        className="inline-flex"
        aria-label={t(
          'results.footprintsLinks.ariaLabel',
          "Sélecteur de type d'empreinte"
        )}
        options={[
          {
            label: (
              <span className="whitespace-nowrap">
                <Trans locale={locale} i18nKey="common.carbonFootprint">
                  Empreinte carbone
                </Trans>
              </span>
            ),
            href: basePathname,
            'data-testid': 'carbon-footprint-link',
            isSelected: currentPage === 'carbone',
          },
          {
            'data-testid': 'water-footprint-link',
            label: (
              <span className="whitespace-nowrap">
                <Trans locale={locale} i18nKey="common.waterFootprint">
                  Empreinte eau
                </Trans>
                &nbsp;
                <Emoji className="text-base">💧</Emoji>
              </span>
            ),
            href: `${basePathname}/eau`,
            isSelected: currentPage === 'eau',
          },
        ]}
      />
    </div>
  )
}
