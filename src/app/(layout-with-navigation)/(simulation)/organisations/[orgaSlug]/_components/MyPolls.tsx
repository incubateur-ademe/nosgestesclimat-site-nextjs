import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { OrganisationPoll } from '@/types/organisations'
import AddPollCard from './myPolls/AddPollCard'
import PollCard from './myPolls/PollCard'

type Props = {
  polls: OrganisationPoll[]
}

export default function MyPolls({ polls }: Props) {
  return (
    <section className="mb-12">
      <Title tag="h2">
        <Trans>Mes campagnes</Trans>
      </Title>

      <ul className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {polls.map((poll, index) => (
          <li key={poll._id} className="col-span-1">
            <PollCard poll={poll} index={index} />
          </li>
        ))}

        <AddPollCard hasNoPollsYet={polls.length === 0} />
      </ul>
    </section>
  )
}
