import Link from '@/components/Link'
import Card from '@/design-system/layout/Card'
import Markdown from '@/design-system/utils/Markdown'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const labelString = ['🖼 exposé'].join(',')

type IssueType = {
  body: string
  id: string
  html_url: string
  title: string
}

export default function ModeleIssuePreviews() {
  const { data: issues } = useQuery({
    queryKey: ['modele-issue-previews'],
    queryFn: () =>
      axios
        .get(
          `https://api.github.com/repos/incubateur-ademe/nosgestesclimat/issues?labels=${labelString}`
        )
        .then((res) => res.data())
        .catch(() => {
          return null
        }),
  })

  if (!issues) return null

  return (
    <ul className="grid list-none grid-cols-1 gap-4 md:grid-cols-2">
      {(issues as IssueType[])?.map(({ body, id, html_url: url, title }) => (
        <Card key={id}>
          <h3>{title}</h3>

          <div
            className="h-[12rem] overflow-hidden"
            style={{
              WebkitMaskImage: 'linear-gradient(180deg, #000 60%, transparent)',
            }}>
            <Markdown>{body}</Markdown>
          </div>

          <Link href={url}>En savoir plus</Link>
        </Card>
      ))}
    </ul>
  )
}
