import Trans from '@/components/translation/Trans'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getPosts } from '@/helpers/markdown/getPosts'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Image from 'next/image'
import ActionPlusList from './_components/ActionPlusList'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Actions, la liste - Nos Gestes Climat'),
    description: t(
      'Découvrez les actions que vous pouvez mettre en place pour réduire votre empreinte carbone.'
    ),
  })
}

export default async function ActionList() {
  const actions = await getPosts(`src/locales/actions-plus/fr/`)

  return (
    <div className="mt-8">
      <h2>
        <Trans>Nos explications complètes</Trans>{' '}
        <Image
          src="/images/misc/beta.svg"
          width={36}
          height={10}
          alt="beta"
          className="inline align-top"
        />
      </h2>

      <p>
        <em>
          <Trans>
            Découvrez les enjeux qui se cachent derrière chaque action.
          </Trans>
        </em>
      </p>

      <ActionPlusList actions={actions} />
    </div>
  )
}
