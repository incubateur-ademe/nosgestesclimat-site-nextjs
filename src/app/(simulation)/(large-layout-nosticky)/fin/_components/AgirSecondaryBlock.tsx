import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'
import Badge from '@/design-system/layout/Badge'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'

export default function AgirSecondaryBlock() {
  const { t } = useClientTranslation()

  return (
    <div className="rainbow-border relative rounded-xl border-2">
      <div className="bg-[url('/images/misc/jagis-bg.svg')] bg-right-bottom bg-no-repeat px-4 py-6 lg:bg-[length:18rem]">
        <div className="mb-4 flex gap-4">
          <Badge size="xs" color="green">
            <Trans>Aides financières</Trans>
          </Badge>
          <Badge size="xs" color="green">
            <Trans>Bons plans</Trans>
          </Badge>
          <Badge size="xs" color="green">
            <Trans>Idées</Trans>
          </Badge>
        </div>
        <h2 className="mb-2">
          <Trans>Que faire pour réduire mon empreinte ?</Trans>
        </h2>
        <p>
          <Trans>
            À partir de votre bilan, <strong>J’agis</strong> vous propose des
            actions concrètes et adaptées à vos envies et à vos moyens
          </Trans>
        </p>
        <a
          className="mb-4"
          href="https://jagis.beta.gouv.fr/">
          <Trans>
            Aller sur la plateforme J'agis
          </Trans>
        </a>
        <div className="flex items-center gap-4">
          <Image
            src="/images/misc/jagis.svg"
            alt={t(`Logo de J'agis`)}
            width="60"
            height="60"
          />
          <Logo size="sm" />
        </div>
      </div>
    </div>
  )
}
