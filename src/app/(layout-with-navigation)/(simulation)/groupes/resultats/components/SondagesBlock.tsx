import Link from '@/components/Link'
import Separator from '@/design-system/layout/Separator'

export default function SondagesBlock() {
  return (
    <div>
      <Separator className="mb-4 mt-8" />
      <h3 className="text-md font-bold mb-1">
        Entreprises, collectivités, écoles
      </h3>
      <p>
        Les <strong>sondages</strong> et <strong>conférences</strong> vous
        permettent de comparer votre empreinte en direct ou en groupes de plus
        de 20 personnes
      </p>
      <Link className="font-bold" href="/groupe">
        Commencer
      </Link>
    </div>
  )
}
