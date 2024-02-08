import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import CreateOrganization from './polls/CreateOrganization'
import PollsList from './polls/PollsList'

export default function SondagesBlock() {
  return (
    <>
      <Title tag="h2" title={<Trans>Entreprises et collectivités</Trans>} />
      <PollsList />
      <CreateOrganization />
    </>
  )
}
