import Emoji from '@/design-system/utils/Emoji'
import Trans from '../translation/Trans'

export default function NosGestesTransportsBanner() {
  return (
    <div className="flex w-full flex-wrap rounded-xl bg-transport-50 p-6 md:flex-nowrap">
      <div>
        <p className="text-lg" style={{ marginBottom: '16px' }}>
          <Emoji
            style={{
              marginRight: '8px',
              fontSize: '2rem',
            }}>
            🚲
          </Emoji>
          <Trans>
            Recevez nos <strong>conseils transports</strong> directement dans
            votre boite mail !
          </Trans>
        </p>
        <p className="text-sm" style={{ marginBottom: '0' }}>
          <Trans>
            Vous accompagner pour mieux agir en{' '}
            <strong className="text-secondary-700">4 mails seulement</strong>.
          </Trans>
        </p>
      </div>
    </div>
  )
}
