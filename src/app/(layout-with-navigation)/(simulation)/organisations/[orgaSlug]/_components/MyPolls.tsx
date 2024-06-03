'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Select from '@/design-system/inputs/Select'
import Title from '@/design-system/layout/Title'
import { OrganisationPoll } from '@/types/organisations'
import { useMemo, useState } from 'react'
import AddPollCard from './myPolls/AddPollCard'
import PollCard from './myPolls/PollCard'

type Props = {
  polls: OrganisationPoll[]
}

export default function MyPolls({ polls }: Props) {
  const [sort, setSort] = useState('date-old')
  const [isMinified, setIsMinified] = useState(true)

  const pollsSorted = useMemo(
    () =>
      polls.sort((a, b) => {
        if (sort === 'date-new') {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        }

        if (sort === 'date-old') {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        }

        if (sort === 'alphabetical') {
          return (a.name ?? '').localeCompare(b.name ?? '')
        }

        if (sort === 'anti-alphabetical') {
          return (b.name ?? '').localeCompare(a.name ?? '')
        }

        return 0
      }),
    [polls, sort]
  )

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between">
        <Title tag="h2">
          <Trans>Mes campagnes</Trans>
        </Title>

        {pollsSorted.length > 0 && (
          <Select
            onChange={(e) => {
              setSort(e.target.value)
            }}
            className="p-2 text-sm"
            name="sortOrder">
            <option value="date-old">
              <Trans>Date (anciennes &gt; récentes)</Trans>
            </option>
            <option value="date-new">
              <Trans>Date (récentes &gt; anciennes)</Trans>
            </option>
            <option value="alphabetical">
              <Trans>Nom (A &gt; Z)</Trans>
            </option>
            <option value="anti-alphabetical">
              <Trans>Nom (Z &gt; A)</Trans>
            </option>
          </Select>
        )}
      </div>

      <ul className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {(isMinified ? pollsSorted.slice(0, 2) : pollsSorted).map(
          (poll, index) => (
            <li key={poll._id} className="col-span-1">
              <PollCard poll={poll} index={index} />
            </li>
          )
        )}

        <AddPollCard hasNoPollsYet={polls.length === 0} />
      </ul>

      {pollsSorted.length > 2 && (
        <Button
          className="mt-6"
          onClick={() => setIsMinified((prevState) => !prevState)}
          color="link">
          {isMinified ? (
            <span>
              + <Trans>Voir toutes les campagnes</Trans>
            </span>
          ) : (
            <span>
              - <Trans>Masquer les autres campagnes</Trans>
            </span>
          )}
        </Button>
      )}
    </section>
  )
}
