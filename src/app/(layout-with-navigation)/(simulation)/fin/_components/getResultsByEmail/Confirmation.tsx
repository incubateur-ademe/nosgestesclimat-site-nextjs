import CheckCircleIcon from '@/components/icons/CheckCircleIcon'
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
          <NGCTrans>Votre simulation est sauvegardée !</NGCTrans> 
          <CheckCircleIcon className="fill-logement-400" />
        </p>
      </div>
      <p className="mt-4 max-w-lg text-left">
        <NGCTrans>
          Vous allez recevoir un email de notre part sous peu, qui vous
          permettra de la retrouver
        </NGCTrans>{' '}
        <strong>
          <NGCTrans>à tout moment</NGCTrans>
        </strong>
        .
      </p>
    </Card>
  )
}
