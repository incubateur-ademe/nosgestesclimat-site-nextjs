import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Kicker from '@/design-system/layout/Kicker'
import Image from 'next/image'

export default function Amis() {
  return (
    <div className="flex-1">
      <Image
        src="/images/misc/amis-screenshot.svg"
        alt="Une capture du mode Amis Nos Gestes Climat."
        width="444"
        height="275"
        className="mb-6 block h-auto max-w-full "
      />
      <Kicker>
        <Trans>Entre amis</Trans>
      </Kicker>
      <h2 className="font-medium md:text-3xl">
        <Trans>Comparez vos résultats</Trans>
      </h2>
      <p className="max-w-sm md:mb-8 md:text-lg">
        <Trans>
          Faites le test en{' '}
          <strong className="text-primary-500">famille</strong>, entre{' '}
          <strong className="text-primary-500">amis</strong> ou{' '}
          <strong className="text-primary-500">collègues</strong> et comparez
          vos résultats.
        </Trans>
      </p>
      <ButtonLink href="/amis">
        <Trans>Commencer</Trans>
      </ButtonLink>
    </div>
  )
}
