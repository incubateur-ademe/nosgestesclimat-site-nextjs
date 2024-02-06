import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import CTACard from './CTACard'

export default function OurTools() {
  const { t } = useClientTranslation()

  return (
    <section>
      <Title tag="h2" title={<Trans>Nos outils</Trans>} />

      <div className="col-span-1 mt-8 grid grid-cols-3 gap-8">
        <CTACard
          className="border border-grey-200 px-8"
          overLabel={<Trans>Partagez Nos Gestes Climat</Trans>}
          title={<Trans>Kit de diffusion</Trans>}
          description={
            <Trans>
              Logo, affiches et présentations : retrouvez tous les outils pour
              partager Nos Gestes Climat dans ce kit.
            </Trans>
          }>
          <ButtonLink
            className="mt-auto w-full justify-center align-bottom"
            color="secondary"
            href="https://nosgestesclimat.fr/NGC_Kit.diffusion.zip">
            <Trans> Télécharger le kit (23mb)</Trans>
          </ButtonLink>
        </CTACard>

        <CTACard
          className="relative overflow-hidden border border-grey-200 px-8"
          overLabel={<Trans>Animez un atelier</Trans>}
          title={<Trans>Jeu de cartes</Trans>}
          description={
            <Trans>
              Quoi de mieux que le jeu pour sensibiliser ? Apprenez les ordres
              de grandeur à vos équipes ou vos élèves avec ce jeu de carte Nos
              Gestes Climat (sur une idée originale de Sabine Lagorce)
            </Trans>
          }>
          <Button
            color="secondary"
            aria-disabled
            aria-label={t('À venir, bouton désactivé.')}
            className="w-full justify-center">
            <Trans>Télécharger (PDF 140mb)</Trans>
          </Button>

          <div className="absolute -right-8 top-6 h-5 w-36 rotate-45 bg-secondary text-center text-sm text-white">
            À venir
          </div>
        </CTACard>
      </div>
    </section>
  )
}
