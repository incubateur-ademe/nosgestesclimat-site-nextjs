import { END_PAGE_PATH } from '@/constants/urls/paths'

export function getEndPageLink(simulationId: string) {
  return END_PAGE_PATH.replace(':id', simulationId)
}
