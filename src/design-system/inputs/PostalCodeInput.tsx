import axios from 'axios'
import AsyncSelect from 'react-select/async'

type Props = {
  postalCode?: string
  setPostalCode: (postalCode: string) => void
}

type Suggestion = {
  value: string
  label: string
}

type City = {
  code: string
  nom: string
  codesPostaux: string[]
}

export default function PostalCodeInput({ postalCode, setPostalCode }: Props) {
  return (
    <AsyncSelect
      className="max-w-[30rem]"
      classNames={{
        control: () =>
          `p-0 border-grey-300 rounded-md border border-solid !bg-grey-100  text-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500`,
        valueContainer: () => `!p-4`,
        input: () => `!p-0 !m-0 border-none`,
      }}
      cacheOptions
      value={
        postalCode
          ? {
              value: postalCode,
              label: postalCode,
            }
          : null
      }
      onChange={(choice: Suggestion | null) =>
        setPostalCode(choice?.value || '')
      }
      loadOptions={(search) => {
        if (search.length < 2) {
          return Promise.resolve([])
        }
        return axios
          .get(
            `https://geo.api.gouv.fr/departements/${search.substring(
              0,
              2
            )}/communes?fields=code,nom,codesPostaux`
          )
          .then((res) =>
            res.data.reduce(
              (suggestionsAccumulator: Suggestion[], city: City) => {
                // Filter postal codes that start with the search string (some cities have multiple postal codes)
                const filteredPostalCodes = city.codesPostaux.filter(
                  (cp: string) => cp.startsWith(search)
                )
                return [
                  ...suggestionsAccumulator,
                  ...filteredPostalCodes.map((cp: string) => ({
                    value: cp,
                    label: `${cp} - ${city.nom}`,
                  })),
                ]
              },
              []
            )
          )
      }}
    />
  )
}
