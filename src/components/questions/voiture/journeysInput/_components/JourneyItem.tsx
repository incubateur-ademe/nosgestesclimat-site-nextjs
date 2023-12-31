import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { Journey } from '@/types/journey'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  journey: Journey
  odd: boolean
  setJourneys: Dispatch<SetStateAction<Journey[]>>
}

export const periods: Record<string, string> = {
  day: 'jour',
  week: 'semaine',
  month: 'mois',
  year: 'an',
}

export const labels: Record<string, string> = {
  work: 'Domicile-Travail',
  holidays: 'Vacances',
  family: 'Visite familiale',
  school: 'Mobilité académique',
  sport: 'Sport ou Loisir',
  occasional: 'Sorties ponctuelles',
  shopping: 'Courses',
  medical: 'RDV médicaux',
  weekends: 'Week-end',
}

export default function JourneyItem({ journey, odd, setJourneys }: Props) {
  const { t } = useTranslation()

  return (
    <tr
      className={`relative block sm:table-row ${odd ? 'bg-primary-100' : ''}`}>
      <td
        className={`block sm:table-cell md:border-r ${
          odd ? 'border-white' : 'border-primary-200'
        } px-4 py-2 text-left text-sm`}>
        {t(labels[journey.label])}
      </td>

      <td
        className={`block sm:table-cell md:border-x ${
          odd ? 'border-white' : 'border-primary-200'
        } px-4 py-2 text-left text-sm`}>
        {journey.distance || 0} km
      </td>

      <td
        className={`block sm:table-cell md:border-x ${
          odd ? 'border-white' : 'border-primary-200'
        } px-4 py-2 text-left text-sm`}>
        {journey.reccurrence} x {t(periods[journey.period])}
      </td>

      <td className="block px-4 py-2 text-left text-sm sm:table-cell">
        {journey.passengers} <Trans>passager(s)</Trans>
      </td>

      <td className="absolute -right-1 -top-2 block py-2 pl-4 pr-2 text-right text-sm sm:static sm:table-cell">
        <Button
          color="text"
          size="sm"
          onClick={() =>
            setJourneys((prevJourneys) =>
              prevJourneys.filter(
                (prevJourney) => prevJourney.id !== journey.id
              )
            )
          }>
          x
        </Button>
      </td>
    </tr>
  )
}
