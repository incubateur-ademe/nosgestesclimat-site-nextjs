import Trans from '@/components/translation/trans/TransServer'
import ButtonLinkServer from '@/design-system/buttons/ButtonLinkServer'

interface Props {
  href: string
  locale: string
}

export default function ButtonNext({ href, locale }: Props) {
  return (
    <ButtonLinkServer
      href={href}
      data-testid="skip-tutorial-button"
      className="min-w-42!">
      <Trans locale={locale} i18nKey="simulator.tutorial.letsGoButton.label">
        C'est parti !
      </Trans>{' '}
      <span aria-hidden="true" className="ml-1">
        →
      </span>
    </ButtonLinkServer>
  )
}
