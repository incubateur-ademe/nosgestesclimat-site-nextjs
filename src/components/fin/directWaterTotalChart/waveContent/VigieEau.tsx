import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { useVigieEau } from '@/hooks/useVigieEau'
// @ts-expect-error There is no types for this package
import France from '@socialgouv/react-departements'
import { motion } from 'framer-motion'

export default function VigieEau() {
  const { departements } = useVigieEau()

  const departementsCodes = departements.map((departement) => departement.code)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className=" relative mt-4 flex origin-top flex-col-reverse rounded-xl border-2 border-primary-50 bg-gray-100 lg:flex-row">
      <div className="relative lg:w-1/2">
        <France
          className="w-1/2"
          departements={departementsCodes}
          color="transparent"
          highlightColor="#d40d83"
        />
      </div>
      <div className="flex-1 p-4 text-sm lg:text-base">
        <p>
          <Trans>
            Voici la carte des départements qui subissent (ou sont proche de
            subir) des restrictions d'eau aujourd'hui.
          </Trans>
        </p>
        <Link href="https://vigieau.gouv.fr/">
          <Trans>Rendez-vous sur Vigie Eau pour en savoir plus.</Trans>
        </Link>
      </div>
    </motion.div>
  )
}
