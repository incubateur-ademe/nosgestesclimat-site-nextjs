import { Group } from '@/types/groups'

export const getGroupURL = (group: Group) =>
  `/groupes/resultats?groupId=${group?._id}`
