import Trans from '@/components/translation/trans/TransServer'
import Switch from '@/design-system/inputs/Switch'
import Emoji from '@/design-system/utils/Emoji'
import type { Locale } from '@/i18nConfig'

interface Props {
  locale: Locale
  simulationId: string
  currentPage: 'carbone' | 'eau'
}

export default function FootprintsLinks({
  locale,
  simulationId,
  currentPage,
}: Props) {
  return (
    <Switch
      className="mb-12 text-center md:text-right"
      options={[
        {
          label: (
            <Trans locale={locale} i18nKey="common.carbonFootprint">
              Empreinte carbone
            </Trans>
          ),
          href: `/${locale}/simulation/${simulationId}/resultats`,
          isSelected: currentPage === 'carbone',
        },
        {
          label: (
            <>
              <Trans locale={locale} i18nKey="common.waterFootprint">
                Empreinte eau
              </Trans>{' '}
              <Emoji className="text-base">💧</Emoji>
            </>
          ),
          href: `/${locale}/simulation/${simulationId}/resultats/eau`,
          isSelected: currentPage === 'eau',
        },
      ]}></Switch>
  )
}
