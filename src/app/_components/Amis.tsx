import { homeClickClassements } from '@/constants/tracking/pages/home'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Kicker from '@/design-system/layout/Kicker'
import Image from 'next/image'

export default function Amis() {
  return (
    <div className="flex-1">
      <Image
        src="/images/misc/amis-screenshot.svg"
        alt="Une capture d'écran du mode Amis Nos Gestes Climat."
        width="444"
        height="275"
        className="mb-6 block h-auto max-w-full "
      />
      <Kicker>
        <NGCTrans>Entre amis</NGCTrans>
      </Kicker>
      <h2 className="font-medium md:text-3xl">
        <NGCTrans>Comparez vos résultats</NGCTrans>
      </h2>
      <p className="max-w-sm md:mb-8 md:text-lg">
        <NGCTrans>Faites le test en</NGCTrans>{' '}
        <strong className="text-primary-700">
          {' '}
          <NGCTrans>famille</NGCTrans>
        </strong>
        , <NGCTrans>entre</NGCTrans>{' '}
        <strong className="text-primary-700">
          {' '}
          <NGCTrans>amis</NGCTrans>
        </strong>{' '}
        <NGCTrans>ou</NGCTrans>{' '}
        <strong className="text-primary-700">
          {' '}
          <NGCTrans>collègues</NGCTrans>
        </strong>{' '}
        <NGCTrans>et comparez vos résultats.</NGCTrans>
      </p>
      <ButtonLink
        href="/amis"
        data-cypress-id="amis-link"
        trackingEvent={homeClickClassements}>
        <NGCTrans>Commencer</NGCTrans>
      </ButtonLink>
    </div>
  )
}
