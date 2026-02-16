import Trans from '@/components/translation/trans/TransServer'
import Badge from '@/design-system/layout/Badge'
import type { Locale } from '@/i18nConfig'

interface Props {
  locale: Locale
}

export default function ObjectiveWithRhythm({ locale }: Props) {
  return (
    <div className="rounded-lg border border-slate-300 p-6">
      <div>
        <Badge className="border-none text-base" color="secondary">
          <Trans locale={locale} i18nKey="common.vous">
            Vous
          </Trans>
        </Badge>
      </div>
    </div>
  )
}
