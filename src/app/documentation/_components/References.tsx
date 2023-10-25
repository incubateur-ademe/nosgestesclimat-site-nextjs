import Link from '@/components/Link'
import Image from 'next/image'
import { capitalise0 } from 'publicodes'
import { RulePage } from 'publicodes-react'
import { ComponentProps } from 'react'

const referencesImages = {
  'service-public.fr': '/références-images/marianne.png',
  'legifrance.gouv.fr': '/références-images/marianne.png',
  'gouv.fr': '/références-images/marianne.png',
  'ladocumentationfrançaise.fr':
    '/références-images/ladocumentationfrançaise.png',
  'senat.fr': '/références-images/senat.png',
  'ademe.fr': 'https://www.ademe.fr/wp-content/uploads/2021/12/logo-ademe.svg',
  'bilans-ges.ademe.fr':
    'https://www.ademe.fr/wp-content/uploads/2021/12/logo-ademe.svg',
}

export type ReferencesProps = {
  references: ComponentProps<
    NonNullable<ComponentProps<typeof RulePage>['renderers']['References']>
  >['references']
}

export default function References({ references }: ReferencesProps) {
  if (!references) return null

  const cleanDomain = (link: string) =>
    (link.includes('://') ? link.split('/')[2] : link.split('/')[0]).replace(
      'www.',
      ''
    )

  // Can be an object with labels as keys or just a list of URLs
  const referencesWithoutKeys = Array.isArray(references)

  return (
    <ul className="list-none pl-2">
      {Object.entries(references).map(([name, link]) => {
        const domain = cleanDomain(link)

        const path = link.split(domain)[1]

        return (
          <li key={name} className="mb-2 flex w-full items-center">
            {!referencesWithoutKeys && (
              <span className="mr-4 flex h-12 w-[4.5rem] items-center justify-center">
                {Object.keys(referencesImages).includes(domain) && (
                  <Image
                    src={
                      referencesImages[domain as keyof typeof referencesImages]
                    }
                    alt={`logo de ${domain}`}
                    className="max-h-12 max-w-full rounded-sm align-sub"
                  />
                )}
              </span>
            )}

            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-1/2 mr-4 flex flex-1 items-center no-underline"
            >
              <span className="ui__ label">{domain}</span>

              <span className="ml-2 inline-block">
                {referencesWithoutKeys ? path : capitalise0(name)}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
