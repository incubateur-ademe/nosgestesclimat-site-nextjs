import { t } from '../metadata/fakeMetadataT'

export function getCTAButtonLabel({ progression }: { progression: number }) {
  // If the user has completed the test we return the results page label
  if (progression === 1) {
    return t('Voir les résultats')
  }

  // If the user has seen the tutoriel we return the test page label
  if (progression > 0) {
    return t('Reprendre mon test')
  }

  // else we return the tutoriel page label
  return t('Passer le test')
}
