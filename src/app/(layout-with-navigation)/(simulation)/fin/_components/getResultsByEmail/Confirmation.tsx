import CheckCircleIcon from '@/components/icons/CheckCircleIcon'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import { twMerge } from 'tailwind-merge'

export default function Confirmation({ className }: { className?: string }) {
  return (
    <Card
      id="email-block"
      className={twMerge(
        'mb-4 items-start border-none bg-gray-100 p-8',
        className
      )}>
      <div className="text-left; bg-transparent text-left text-2xl font-bold">
        <p className="flex items-center gap-1">
          <Trans>Votre simulation est sauvegardée !</Trans> 
          <CheckCircleIcon className="fill-logement-400" />
        </p>
      </div>
      <p className="mt-4 max-w-lg text-left">
        <Trans>
          Vous allez recevoir un email de notre part sous peu, qui vous
          permettra de la retrouver
        </Trans>{' '}
        <strong>
          <Trans>à tout moment</Trans>
        </strong>
        .
      </p>
    </Card>
  )
}
