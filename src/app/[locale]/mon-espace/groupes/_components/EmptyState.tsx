import Trans from '@/components/translation/trans/TransServer'
import { linkToGroupCreation } from '@/constants/group'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import type { Locale } from '@/i18nConfig'

type Props = {
  locale: Locale
}

export default function EmptyState({ locale }: Props) {
  return (
    <div className="mt-6 flex gap-8">
      <section>
        <Title
          tag="h2"
          className="mb-4 text-2xl font-medium md:text-3xl"
          title={
            <Trans locale={locale} i18nKey="mon-espace.groups.empty.title">
              Invitez votre entourage à calculer leur empreinte
            </Trans>
          }
        />
        <p className="mb-6">
          <strong>
            <Trans
              locale={locale}
              i18nKey="mon-espace.groups.empty.description1">
              Diffusez un lien collectif
            </Trans>
          </strong>{' '}
          <Trans locale={locale} i18nKey="mon-espace.groups.empty.description2">
            pour
          </Trans>{' '}
          <strong>
            <Trans
              locale={locale}
              i18nKey="mon-espace.groups.empty.description3">
              faire passer le test à vos amis
            </Trans>
          </strong>{' '}
          <Trans locale={locale} i18nKey="mon-espace.groups.empty.description4">
            ou
          </Trans>{' '}
          <strong>
            <Trans
              locale={locale}
              i18nKey="mon-espace.groups.empty.description5">
              sensibilisez les membres de votre organisation.
            </Trans>
          </strong>
        </p>

        <p className="text-primary-700 mb-8 font-medium">
          <Trans locale={locale} i18nKey="mon-espace.groups.empty.description">
            Gratuit, 100 % anonyme et surtout sans jugement ni comparaison.
          </Trans>
        </p>
        <ButtonLink href={linkToGroupCreation}>
          <Trans locale={locale} i18nKey="mon-espace.groups.empty.button">
            Commencer
          </Trans>
        </ButtonLink>
      </section>

      <ul className="hidden flex-col gap-4 lg:flex lg:min-w-[400px] lg:flex-row lg:flex-wrap lg:justify-center">
        <Card
          tag="li"
          className="flex max-w-56 items-center gap-4 border-none bg-blue-50 p-6">
          <img
            src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/environmentalism_1_0657edeb28.svg"
            alt=""
            width={40}
            height={40}
          />
          <div className="text-primary-700 text-center text-lg font-semibold">
            <Trans locale={locale} i18nKey="mon-espace.groups.empty.awareness">
              Sensibiliser mon organisation
            </Trans>
          </div>
        </Card>
        <Card
          tag="li"
          className="flex items-center gap-4 border-none bg-blue-50 p-6 lg:max-w-40 lg:-translate-y-4">
          <img
            src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/cheers_c44311442b.svg"
            alt=""
            width={40}
            height={40}
          />
          <div className="text-primary-700 text-center text-lg font-semibold">
            <Trans locale={locale} i18nKey="mon-espace.groups.empty.challenge1">
              Défier mes amis
            </Trans>
          </div>
        </Card>
        <Card
          tag="li"
          className="flex max-w-64 items-center gap-4 border-none bg-blue-50 p-6">
          <img
            src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/familly_10373dd34c.svg"
            alt=""
            width={40}
            height={40}
          />
          <div className="text-primary-700 text-center text-lg font-semibold">
            <Trans locale={locale} i18nKey="mon-espace.groups.empty.challenge2">
              Challenger ma famille
            </Trans>
          </div>
        </Card>
      </ul>
    </div>
  )
}
