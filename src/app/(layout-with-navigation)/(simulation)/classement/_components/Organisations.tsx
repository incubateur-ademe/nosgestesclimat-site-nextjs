import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import CreateOrganisation from './Organisations/CreateOrganisation'
import PollsList from './Organisations/PollsList'

export default function Organisations() {
  return (
    <>
      <Title
        tag="h2"
        title={<Trans>Entreprises et collectivités</Trans>}
        hasSeparator={false}
      />
      <PollsList />
      <CreateOrganisation />
    </>
  )
}
