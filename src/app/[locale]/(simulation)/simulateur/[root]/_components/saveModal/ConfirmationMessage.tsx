import Trans from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'

export default function ConfirmationMessage() {
  return (
    <Title
      tag="h2"
      hasSeparator={false}
      className="flex items-center gap-1"
      subtitle={
        <Trans>
          Vous pouvez le reprendre plus tard en cliquant sur le lien que vous
          avez reçu par e-mail.
        </Trans>
      }>
      <Trans>Votre test est sauvegardé !</Trans>
      <svg
        className="inline-block h-8 w-8"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill="none"
          stroke="rgb(22, 163, 74)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="200"
          strokeDashoffset="200"
          d="M20 50 L40 70 L80 30">
          <animate
            attributeName="stroke-dashoffset"
            from="200"
            to="0"
            dur="1s"
            begin="0s"
            fill="freeze"
            calcMode="linear"
          />
        </path>
      </svg>
    </Title>
  )
}
