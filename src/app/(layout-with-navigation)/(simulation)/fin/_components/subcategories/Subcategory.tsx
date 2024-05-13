import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Emoji from '@/design-system/utils/Emoji'
import {
  getBorderLightColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { twMerge } from 'tailwind-merge'
import Actions from './subcategory/Actions'

type Props = {
  subcategory: DottedName
  index: number
}
export default function Subcategory({ subcategory, index }: Props) {
  const { numericValue: total } = useRule('bilan')

  const { title, icons, numericValue, category } = useRule(subcategory)

  const percent = Math.round((numericValue / total) * 100)
  return (
    <div
      className={twMerge(
        'w-full',
        getTextDarkColor(category),
        getBorderLightColor(category)
      )}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="mb-1 text-2xl lg:text-3xl">
            {index + 1}. {title}
          </h3>
          <div className="text-xl lg:text-2xl">
            <span className="font-black text-secondary-700">{percent} %</span>{' '}
            de votre empreinte
          </div>
        </div>
        <Emoji className="text-4xl lg:text-6xl">{icons?.slice(0, 2)}</Emoji>
      </div>
      <p className="mb-6 text-sm">
        <Trans>
          Voici quelques idées pour vous aider à réduire votre impact :
        </Trans>
      </p>
      <Actions subcategory={subcategory} />
      <div className="flex justify-center">
        <Link href="/actions" className="text-center text-xs">
          <Trans>Voir tous les gestes {title}</Trans>
        </Link>
      </div>
    </div>
  )
}
