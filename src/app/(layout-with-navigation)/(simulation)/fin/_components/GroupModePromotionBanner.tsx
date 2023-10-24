import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'

export default async function GroupModePromotionBanner() {
  const { t } = await getServerTranslation()

  return (
    <Card className="flex-row justify-center gap-4 border-none bg-primaryDark pb-0 text-white md:gap-8">
      <div className="flex items-end justify-end">
        <Image
          src="./images/misc/Groupe.svg"
          width="150"
          height="150"
          alt={t('Une capture du mode Groupe Nos Gestes Climat.')}
        />
      </div>

      <div className="flex flex-1 flex-col items-start justify-center pb-4">
        <p>
          <Trans>
            Comparez vos résultats{' '}
            <span className="text-pink-100">avec vos proches</span>
          </Trans>
        </p>

        <ButtonLink color="secondary" href="/amis">
          <Trans>Créer un groupe</Trans>
        </ButtonLink>
      </div>
    </Card>
  )
}
