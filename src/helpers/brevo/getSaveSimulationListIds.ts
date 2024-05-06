import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'

type Inputs = {
  'newsletter-saisonniere': boolean
  'newsletter-transports': boolean
}

export function getSaveSimulationListIds(data: Inputs) {
  const listIds = []

  if (data['newsletter-saisonniere']) {
    listIds.push(LIST_MAIN_NEWSLETTER)
  }

  if (data['newsletter-transports']) {
    listIds.push(LIST_NOS_GESTES_TRANSPORT_NEWSLETTER)
  }

  return listIds
}
