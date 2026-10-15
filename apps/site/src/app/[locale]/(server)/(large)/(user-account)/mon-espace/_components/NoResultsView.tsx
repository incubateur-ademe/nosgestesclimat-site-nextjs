import NoResultsBlock from '@/components/dashboard/NoResultsBlock'
import UserSpaceTabs from '@/components/layout/UserSpaceTabs'
import InstructionsBanner from './noResultsView/InstructionsBanner'

export default function NoResultsView() {
  return (
    <>
      <InstructionsBanner />

      <UserSpaceTabs isAuth />

      <NoResultsBlock />
    </>
  )
}
