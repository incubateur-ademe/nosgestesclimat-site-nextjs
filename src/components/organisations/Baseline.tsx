import Trans from '../translation/Trans'

export default function Baseline() {
  return (
    <>
      <Trans>
        Vous souhaitez mobiliser votre{' '}
        <strong className="text-primary-500">entreprise</strong>, votre{' '}
        <strong className="text-primary-500">organisation</strong>, votre
        <strong className="text-primary-500">association</strong> ou{' '}
        <strong className="text-primary-500">salle de classe</strong>
      </Trans>
       ? <Trans>Découvrez nos outils pour vous simplifier la vie !</Trans>
    </>
  )
}
