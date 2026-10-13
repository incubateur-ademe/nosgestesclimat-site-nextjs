import NoResultsBlock from '@/components/dashboard/NoResultsBlock'
import { MON_ESPACE_PATH } from '@/constants/urls/paths'
import InstructionsBanner from './noResultsView/InstructionsBanner'
import ProfileTab from './ProfileTabs'

export default function NoResultsView() {
  return (
    <>
      <InstructionsBanner />

      <ProfileTab activePath={MON_ESPACE_PATH} />

      <NoResultsBlock />
    </>
  )
}
