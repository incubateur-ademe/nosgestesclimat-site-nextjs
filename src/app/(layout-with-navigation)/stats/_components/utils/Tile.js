'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'

export default function Tile(props) {
  const { t } = useClientTranslation()

  return (
    <section className={`mb-4 ${props?.className || ''}`}>
      <div className="relative flex h-full flex-col justify-between p-8">
        <div className="height-2 absolute bottom-0 left-0 right-0 bg-primary-700" />
        <div className="flex flex-1 flex-col">
          {props.title && <h3>{props.title}</h3>}
          {props.text && <p>{props.text}</p>}
        </div>
        <div>
          {props.link && (
            <div className="flex justify-end">
              <button>{props.linkLabel || t('En savoir +')}</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
