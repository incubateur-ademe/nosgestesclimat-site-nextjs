import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import ambassadeurs from '@/locales/ambassadeurs/fr/ambassadeurs.yaml'
import Image from 'next/image'

const categories: any = Object.keys(ambassadeurs)

export default function page() {
  console.log(categories)
  return (
    <div>
      <Title>
        <Trans>Ambassadeurs</Trans>
      </Title>

      {categories.map((category: any) => (
        <div key={category} className="mb-16">
          <h2>{category}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ambassadeurs[category].map((ambassadeur: any) => (
              <Card
                key={ambassadeur.title}
                href={ambassadeur.link}
                tag="a"
                className="no-underline"
                target="_blank">
                <Image
                  src={'/images/ambassadeurs/' + ambassadeur.image}
                  width="100"
                  height="100"
                  className="mx-auto mb-4 h-36 w-2/3 object-contain"
                  alt={ambassadeur.title}
                />
                <p className="mb-4 font-bold">{ambassadeur.title}</p>
                {ambassadeur.link ? (
                  <p className="my-0 underline">
                    {
                      ambassadeur.link
                        .replace('https://', '')
                        .replace('www.', '')
                        .split('/')[0]
                    }
                  </p>
                ) : null}
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
