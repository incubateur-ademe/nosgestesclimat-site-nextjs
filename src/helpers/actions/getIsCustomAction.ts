import { CUSTOM_NGC_ACTIONS } from '@/constants/actions'

export function getIsCustomAction(dottedName: string) {
  return CUSTOM_NGC_ACTIONS.includes(dottedName)
}
