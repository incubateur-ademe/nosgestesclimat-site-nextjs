import NorthStarBanner from '@/components/northstar/NorthstarBanner'
import Total from '@/components/simulation/Total'
import TransServer from '@/components/translation/TransServer'
import Title from '@/design-system/layout/Title'
import { PropsWithChildren } from 'react'

export default function ActionsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Title title={<TransServer>Agir</TransServer>} />

      <Total />
      <NorthStarBanner type="action" />
      <div>{children}</div>
    </>
  )
}
