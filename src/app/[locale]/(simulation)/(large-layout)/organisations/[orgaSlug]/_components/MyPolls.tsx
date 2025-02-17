'use client'

import TransClient from '@/components/translation/trans/TransClient'
import Button from '@/design-system/inputs/Button'
import Select from '@/design-system/inputs/Select'
import Title from '@/design-system/layout/Title'
import type { OrganisationPoll } from '@/types/organisations'
import { useMemo, useState } from 'react'
import AddPollCard from './myPolls/AddPollCard'
import PollCard from './myPolls/PollCard'

type Props = {
  polls?: OrganisationPoll[]
}

export default function MyPolls({ polls }: Props) {
  const [sort, setSort] = useState('date-old')
  const [isMinified, setIsMinified] = useState(true)

  const pollsSorted = useMemo(
    () =>
      (polls || []).sort((a, b) => {
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

  if (!polls) {
    return null
  }

  return (
    <section className="mb-12">
      <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
        <Title tag="h2">
          <TransClient>Mes campagnes</TransClient>
        </Title>

        {pollsSorted.length > 0 && (
          <Select
            onChange={(e) => {
              setSort(e.target.value)
            }}
            className="p-2 text-sm"
            name="sortOrder">
            <option value="date-old">
              <TransClient>Date (anciennes &gt; récentes)</TransClient>
            </option>
            <option value="date-new">
              <TransClient>Date (récentes &gt; anciennes)</TransClient>
            </option>
            <option value="alphabetical">
              <TransClient>Nom (A &gt; Z)</TransClient>
            </option>
            <option value="anti-alphabetical">
              <TransClient>Nom (Z &gt; A)</TransClient>
            </option>
          </Select>
        )}
      </div>

      <ul className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {(isMinified ? pollsSorted.slice(0, 2) : pollsSorted).map(
          (poll, index) => (
            <li key={poll.id} className="col-span-1">
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
              + <TransClient>Voir toutes les campagnes</TransClient>
            </span>
          ) : (
            <span>
              - <TransClient>Masquer les autres campagnes</TransClient>
            </span>
          )}
        </Button>
      )}
    </section>
  )
}
