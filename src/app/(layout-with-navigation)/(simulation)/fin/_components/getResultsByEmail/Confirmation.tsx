import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { twMerge } from 'tailwind-merge'

export default function Confirmation({ className }: { className?: string }) {
  return (
    <Card
      className={twMerge(
        'mb-4 items-start border-none bg-grey-100 py-8',
        className
      )}>
      <div className="text-left; bg-transparent text-left text-2xl font-bold">
        <p>
          <Trans>Votre simulation est sauvegardée&#8239;!</Trans>
          &#8239;
          <Emoji className="inline-block">✅</Emoji>
        </p>
      </div>
      <p className="mt-4 max-w-lg text-left">
        <Trans>
          Vous allez recevoir un email de notre part sous peu, qui vous
          permettra de la retrouver <strong>à tout moment</strong>.
        </Trans>
      </p>
    </Card>
  )
}
