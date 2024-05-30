type Props = {
  orgaSlug: string
  pollSlug: string
}

export const getLinkToPollDashboard = ({ orgaSlug, pollSlug }: Props) =>
  `/organisations/${orgaSlug}/campagnes/${pollSlug}`
