import Trans from '@/components/translation/trans/TransServer'
import { twMerge } from 'tailwind-merge'
import Arrow from './Arrow'

const position = (2 / 12) * 100

type Props = { locale: string }
export default function TargetNumberServer({ locale }: Props) {
  return (
    <div
      className={twMerge('absolute top-8 -translate-x-1/2 text-left lg:top-10')}
      style={{ left: `${position}%` }}
      aria-hidden="true">
      <div className="absolute top-full mt-1 whitespace-nowrap">
        <strong className="text-secondary-700 font-black">2 tonnes,</strong>
        <br />
        <span>
          <Trans locale={locale}>l'objectif pour 2050</Trans>
        </span>
      </div>
      <Arrow className="h-4 w-4 rotate-180" aria-hidden="true" />
    </div>
  )
}
