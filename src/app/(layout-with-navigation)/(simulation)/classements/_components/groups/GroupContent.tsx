import { Group } from '@/types/groups'
import CreateFirstGroupSection from './CreateFirstGroupSection'
import ServerErrorSection from './ServerErrorSection'
import GroupList from './createOtherGroupsSection/GroupList'

type Props = {
  isError: boolean
  groups: Group[]
}

export default function GroupContent({ isError, groups }: Props) {
  if (isError) {
    return <ServerErrorSection />
  }

  if (!groups || groups?.length === 0) {
    return <CreateFirstGroupSection />
  }
  return <GroupList groups={groups} />
}
