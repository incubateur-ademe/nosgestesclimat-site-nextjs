import { Group } from '@/types/groups'

export const getGroupURL = (group: Group) =>
  `/amis/resultats?groupId=${group?._id}`
