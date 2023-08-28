'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'

export type RegionAuthor = {
  nom: string
  url?: string
}

export const DEFAULT_REGION_MODEL_AUTHOR: RegionAuthor = {
  nom: 'l’équipe de nosgestesclimat.fr',
  url: 'https://nosgestesclimat.fr/à-propos',
}

export default function RegionModelAuthors({
  authors = [],
}: {
  authors?: RegionAuthor[]
}) {
  const { t } = useClientTranslation()

  return (
    <small>
      {authors.length > 0 && (
        <p>
          {t('Ce modèle a été conçu par')}{' '}
          {authors.map((author, i) => (
            <span>
              <a href={author?.url ?? '#'} target="_blank">
                {author.nom}
              </a>
              {i !== authors.length - 1 && ' ' + t('et') + ' '}
            </span>
          ))}
        </p>
      )}
    </small>
  )
}
