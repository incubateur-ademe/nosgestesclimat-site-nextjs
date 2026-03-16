interface Props {
  isIframe?: boolean
  hideIfNotFrenchRegion?: boolean
  isFrenchRegion?: boolean
  isIframeOnlySimulation?: boolean
}

export function shouldHideIfIframe({
  isIframe,
  hideIfNotFrenchRegion,
  isFrenchRegion,
  isIframeOnlySimulation,
}: Props) {
  // Allows hiding not internationalized features (like the ones involving transactional e-mails)
  if (isIframe && hideIfNotFrenchRegion && !isFrenchRegion) return true

  if (isIframeOnlySimulation) return true

  return false
}
