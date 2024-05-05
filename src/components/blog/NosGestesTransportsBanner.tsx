import Trans from '../translation/Trans'

export default function NosGestesTransportsBanner() {
  return (
    <div>
      <div className="flex flex-wrap md:flex-nowrap">
        <p className="text-lg">
          <Trans>
            Recevez nos <strong>conseils transports</strong> directement dans
            votre boite mail !
          </Trans>
        </p>
        <p className="mb-0 text-sm">
          <Trans>
            Vous accompagner pour mieux agir en{' '}
            <strong className="text-secondary-700">4 mails seulement</strong>
          </Trans>
        </p>
      </div>
    </div>
  )
}
