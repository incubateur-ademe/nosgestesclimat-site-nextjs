import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'

export default async function GroupModePromotionBanner() {
  const { t } = await getServerTranslation()

  return (
    <Card className="flex-row gap-4 bg-primaryDark pb-0 text-white">
      <Image
        src="./images/misc/Groupe.svg"
        width="150"
        height="150"
        alt={t('Une capture du mode Groupe Nos Gestes Climat.')}
      />

      <div className="pb-4">
        <p>
          <Trans>
            Comparez vos résultats{' '}
            <span className="text-pink-100">avec vos proches</span>
          </Trans>
        </p>

        <ButtonLink href="/amis">
          <Trans>Créer un groupe</Trans>
        </ButtonLink>
      </div>
    </Card>
  )
}
