export const linkToGroupCreation = '/amis/creer'

export const getLinkToGroupDashboard = ({ groupId }: { groupId: string }) =>
  `/amis/resultats?groupId=${groupId}`
