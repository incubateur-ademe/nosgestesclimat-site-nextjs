import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Markdown from '@/design-system/utils/Markdown'

const labelString = ['🖼 exposé'].join(',')

type IssueType = {
  body: string
  id: string
  html_url: string
  title: string
}

export default async function ModeleIssuePreviews() {
  const issues: IssueType[] = await fetch(
    `https://api.github.com/repos/incubateur-ademe/nosgestesclimat/issues?labels=${labelString}`
  )
    .then((res) => res.json())
    .catch(() => {
      return null
    })

  if (!issues) return null

  return (
    <>
      <p>
        <Trans i18nKey={'model.active'}>
          Voici à titre d'exemple quelques <em>issues</em> importantes du moment
          parmi la centaine de sujets documentés.
        </Trans>
      </p>

      <ul className="grid list-none grid-cols-1 gap-4 md:grid-cols-2">
        {issues?.map(({ body, id, html_url: url, title }) => (
          <Card key={id}>
            <h3>{title}</h3>

            <div
              className="h-[12rem] overflow-hidden"
              style={{
                WebkitMaskImage:
                  'linear-gradient(180deg, #000 60%, transparent)',
              }}>
              <Markdown>{body}</Markdown>
            </div>

            <Link href={url}>En savoir plus</Link>
          </Card>
        ))}
      </ul>
    </>
  )
}
