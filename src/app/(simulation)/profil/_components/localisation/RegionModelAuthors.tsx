'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import Link from 'next/link'

export type RegionAuthor = {
  nom: string
  url?: string
}

export const DEFAULT_REGION_MODEL_AUTHOR: RegionAuthor = {
  nom: 'l’équipe de nosgestesclimat.fr',
  url: '/a-propos',
}

export default function RegionModelAuthors({
  authors = [],
}: {
  authors?: RegionAuthor[]
}) {
  const { t } = useClientTranslation()

  return (
    <small>
      <p className="m-0">
        {t('Ce modèle a été conçu par')}{' '}
        {authors.length > 0 &&
          authors.map((author, i) => {
            return (
              <span>
                <Link href={author?.url ?? '#'} target="_blank">
                  {author.nom}
                </Link>
                {i !== authors.length - 1 && ' ' + t('et') + ' '}
              </span>
            )
          })}
        {authors.length === 0 && (
          <Link href={DEFAULT_REGION_MODEL_AUTHOR.url || ''}>
            {DEFAULT_REGION_MODEL_AUTHOR.nom}
          </Link>
        )}
      </p>
    </small>
  )
}
