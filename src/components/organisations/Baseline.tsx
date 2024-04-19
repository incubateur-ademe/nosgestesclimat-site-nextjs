import Trans from '../translation/Trans'

export default function Baseline() {
  return (
    <p>
      <>
        <Trans>Vous souhaitez mobiliser votre</Trans>{' '}
        <strong className="text-secondary-500">
          <Trans>entreprise</Trans>
        </strong>{' '}
        <Trans>, votre</Trans>{' '}
        <strong className="text-secondary-500">
          <Trans>organisation</Trans>
        </strong>{' '}
        <Trans>, votre</Trans>{' '}
        <strong className="text-secondary-500">
          <Trans>association</Trans>
        </strong>{' '}
        <Trans>ou</Trans>{' '}
        <strong className="text-secondary-500">
          <Trans>salle de classe</Trans>
        </strong>
      </>
       ? <Trans>Découvrez nos outils pour vous simplifier la vie !</Trans>
    </p>
  )
}
