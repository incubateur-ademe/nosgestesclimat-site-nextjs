import { Group } from '@/types/groups'

export const linkToGroupCreation = '/amis/creer'

type Props = {
  group?: Group
  groupId?: string
}
// Returns the link to the group dashboard. You can pass either a group or a groupId
export const getLinkToGroupDashboard = ({ group, groupId }: Props) =>
  `/amis/resultats?groupId=${group ? group._id : groupId}`

// Returns the link to the group invitation. You can pass either a group or a groupId
export const getLinkToGroupInvitation = ({ group, groupId }: Props) =>
  `/amis/invitation?groupId=${group ? group._id : groupId}`
