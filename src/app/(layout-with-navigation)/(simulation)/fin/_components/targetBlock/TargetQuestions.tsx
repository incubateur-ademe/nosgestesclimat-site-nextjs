/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import Trans from '@/components/translation/Trans'

export default function TargetQuestions() {
  return (
    <div>
      <details>
        <summary
          className="mb-2 cursor-pointer text-primary-700"
          onClick={() => {
            //TODO: trackEvent()
          }}>
          <Trans>Est-ce que je peux y arriver tout seul ?</Trans>
        </summary>
        <div className="my-2 ml-3.5">
          <p>
            <Trans>Bof. Mais essaie quand même champion.</Trans>
          </p>
        </div>
      </details>
      <details>
        <summary
          className="mb-2 cursor-pointer text-primary-700"
          onClick={() => {
            //TODO: trackEvent()
          }}>
          <Trans>2 tonnes, ça représente quoi ?</Trans>
        </summary>
        <div className="my-2 ml-3.5">
          <p>
            <Trans>C'est pas beaucoup</Trans>
          </p>
        </div>
      </details>
      <details>
        <summary
          className="mb-2 cursor-pointer text-primary-700"
          onClick={() => {
            //TODO: trackEvent()
          }}>
          <Trans>Par ou commencer ?</Trans>
        </summary>
        <div className="my-2 ml-3.5">
          <p>
            <Trans>Blablabla</Trans>
          </p>
        </div>
      </details>
    </div>
  )
}
