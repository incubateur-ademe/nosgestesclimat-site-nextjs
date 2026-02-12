import OrganisationFilAriane from '@/components/layout/FilAriane'
import Trans from '@/components/translation/trans/TransServer'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import CalendlyWidget from './_components/CalendlyWidget'

/* global PageProps */

export default async function DemanderDemoPage({
  params,
}: PageProps<'/[locale]/organisations/demander-demo'>) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  return (
    <>
      <OrganisationFilAriane
        t={t}
        currentPage={{
          label: t('Demander une démo'),
          href: `/organisations/demander-demo`,
        }}
      />
      <section className="w-full bg-[#fff]">
        <div className="mx-auto max-w-5xl py-10">
          <Title
            title={
              <Trans i18nKey="organisations.demanderDemo.title" locale={locale}>
                Demander une démo
              </Trans>
            }
            subtitle={
              <Trans
                i18nKey="organisations.demanderDemo.subtitle"
                locale={locale}>
                Réservez un créneau pour assister à une démonstration de notre
                fonctionnalité dédiée aux organisations (entreprises,
                associations, écoles…) et vous permettre de diffuser le test de
                Nos Gestes Climat à votre audience.
              </Trans>
            }
          />
          <CalendlyWidget />
        </div>
      </section>
    </>
  )
}
