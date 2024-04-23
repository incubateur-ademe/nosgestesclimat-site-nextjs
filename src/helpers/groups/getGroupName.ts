import { GROUP_NAMES } from '@/constants/groupNames'
import { Group } from '@/types/groups'

export function getGroupName(groups: Group[], locale: string) {
  const groupObject =
    GROUP_NAMES[groups.length % GROUP_NAMES.length] ?? GROUP_NAMES[0]
  if (locale !== 'fr') {
    return {
      name: 'My group',
      emoji: groupObject.emoji,
    }
  }

  return GROUP_NAMES[groups.length % GROUP_NAMES.length] ?? GROUP_NAMES[0]
}
