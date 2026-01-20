import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { Locale } from '@/i18nConfig'
import LargeLayout from '../(large-layout)/layout'

export default async function NewsletterManagementPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  return (
    <LargeLayout params={params}>
      <div className="w-full pt-8">
        <Title
          title={t(
            'newsletterManagement.title',
            'Sélectionnez les infolettres qui vous intéressent'
          )}
        />
      </div>
    </LargeLayout>
  )
}
