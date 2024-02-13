import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function CTAFooter() {
  const { t } = await getServerTranslation()
  return (
    <section className="pb-24 pt-16">
      <div className="mx-auto max-w-5xl">
        <div className="w-[34rem] max-w-full">
          <h2>
            <Trans>Créez votre compte organisation</Trans>
          </h2>

          <p className="mb-8">
            <strong className="text-primary-700">
              <Trans>2 petites minutes</Trans>
            </strong>{' '}
            {t(
              'pour créer un compte, et vous pourrez retrouver tous nos services gratuitement\u202f!'
            )}
          </p>

          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/organisations/connexion">
              <Trans>Créer un compte</Trans>
            </ButtonLink>

            <ButtonLink
              color="text"
              className="underline"
              href="/contact?motif=demo">
              <Trans>Demandez une démo</Trans>
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
