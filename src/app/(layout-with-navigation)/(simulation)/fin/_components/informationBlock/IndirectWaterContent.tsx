import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { twMerge } from 'tailwind-merge'
import EmojiChain from './indirectWaterContent/EmojiChain'

type Props = {
  isOpen: boolean
  isHedgehog: boolean
}
export default function IndirectWaterContent({ isOpen, isHedgehog }: Props) {
  return (
    <>
      <div className={twMerge('lg:hidden', isOpen ? '' : '-mb-8')}>
        <Title
          tag="h2"
          className="text-lg lg:text-2xl"
          hasSeparator={isOpen}
          title={
            <Trans>
              <strong className="font-black text-secondary-700">
                L’eau indirecte
              </strong>
              , c’est quoi ?
            </Trans>
          }
        />
      </div>
      <div className="hidden lg:block">
        <Title
          tag="h2"
          className=" text-lg lg:text-2xl"
          title={
            <Trans>
              <strong className="font-black text-secondary-700">
                L’eau indirecte
              </strong>
              , c’est quoi ?
            </Trans>
          }
        />
      </div>
      <div
        className={twMerge(
          'lg:block',
          isOpen || isHedgehog ? 'block' : 'hidden'
        )}>
        <p className="mb-1">
          <Trans>L’eau indirecte est liée à vos usages :</Trans>
        </p>
        <p className="mb-1">
          <Trans>
            c’est celle qui a fait pousser les fruits, légumes et céréales que
            vous mangez, ou le coton que vous portez ;
          </Trans>
        </p>
        <EmojiChain emojis={['💧', '🥑']} />
        <EmojiChain emojis={['💧', '🌿', '👕']} />
        <p className="mb-1">
          <Trans>
            celle aussi qui a aidé à faire grandir les animaux que vous
            consommez ;
          </Trans>
        </p>
        <EmojiChain emojis={['💧', '🌽', '🐮']} />
        <p className="mb-1">
          <Trans>celle évaporée par les centrales ;</Trans>
        </p>
        <EmojiChain emojis={['💧', '⚡️']} />
        <p className="mb-1">
          <Trans>
            ou encore celle qui a servi à extraire les matériaux de vos
            appareils numériques.
          </Trans>
        </p>
        <EmojiChain emojis={['💧', '⛏️', '💻']} />
      </div>
    </>
  )
}
