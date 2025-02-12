import Trans from '../translation/Trans'

export default function Baseline() {
  return (
    <p>
      <strong className="text-secondary-700">
        <Trans locale={locale}>Entreprises</Trans>
      </strong>
      ,{' '}
      <strong className="text-secondary-700">
        <Trans locale={locale}>collectivités</Trans>
      </strong>
      ,{' '}
      <strong className="text-secondary-700">
        <Trans locale={locale}>associations</Trans>
      </strong>
      ,{' '}
      <strong className="text-secondary-700">
        <Trans locale={locale}>écoles</Trans>
      </strong>{' '}
      ou encore{' '}
      <strong className="text-secondary-700">
        <Trans locale={locale}>festivals</Trans>
      </strong>
       :{' '}
      <Trans locale={locale}>
        vous souhaitez lancer une campagne Nos Gestes Climat et sensibiliser
        toutes vos parties prenantes ? Découvrez nos outils 100% gratuits !
      </Trans>
    </p>
  )
}
