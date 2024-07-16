import Trans from '@/components/translation/Trans'
import { useVigieEau } from '@/hooks/useVigieEau'
import France from '@socialgouv/react-departements'
import { ReactElement } from 'react'

const alertLevelsTitle: Record<string, ReactElement> = {
  vigilance: (
    <Trans>
      L'eau potable est en{' '}
      <strong className="text-secondary-700">vigilance</strong> dans votre
      commune.
    </Trans>
  ),
  alerte_renforcee: (
    <Trans>
      L'eau potable est en{' '}
      <strong className="text-secondary-700">alerte renforcée</strong> dans
      votre commune.
    </Trans>
  ),
  crise: (
    <Trans>
      L'eau potable est en <strong className="text-secondary-700">crise</strong>{' '}
      dans votre commune.
    </Trans>
  ),
}
const alertLevelsContent: Record<string, ReactElement> = {
  vigilance: (
    <Trans>
      L'eau risque de manquer dans votre territoire. Nous vous invitons à
      réduire votre consommation.
    </Trans>
  ),
  alerte_renforcee: (
    <Trans>
      Il y a pénurie d'eau dans votre territoire et des restrictions sont en
      cours.
    </Trans>
  ),
  crise: (
    <Trans>
      Il y a pénurie d'eau importante dans votre territoire. Des restrictions
      importantes ont été mises en place.
    </Trans>
  ),
}
export default function VigieEau() {
  const { departements } = useVigieEau()

  const departementsCodes = departements.map((departement) => departement.code)

  return (
    <div className="relative rounded-xl border-2 border-primary-50 bg-gray-100">
      <France
        departements={departementsCodes}
        color="transparent"
        highlightColor="#d40d83"
      />
    </div>
  )

  // if (isError) {
  //   console.log(error)
  //   return <div>Pas de restriction</div>
  // }

  // console.log(data)

  // if (data.statusCode === 404) {
  //   return <div>Not found</div>
  // }

  // return (
  //   <div>
  //     <Title subtitle={<Trans>{alertLevelsTitle[data.niveauGravite]}</Trans>}>
  //       <Trans>Restriction en cours</Trans>
  //     </Title>
  //     <p>{alertLevelsContent[data.niveauGravite]}</p>
  //     <Link
  //       href={`https://vigieau.gouv.fr/situation?commune=${inseeCode}&profil=particulier&typeEau=AEP`}>
  //       <Trans>Retrouvez plus de détail sur le site Vigie Eau</Trans>
  //     </Link>
  //   </div>
  // )
}
