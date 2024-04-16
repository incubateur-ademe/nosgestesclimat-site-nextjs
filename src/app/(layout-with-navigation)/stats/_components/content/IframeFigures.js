import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import { useUser } from '@/publicodes-state'

export default function IframeFigures(props) {
  const { user } = useUser()
  if (!props.pages.length || !props.activePages.length) return
  const [iframes, activeIframes] =
    props.pages &&
    props.activePages &&
    getIframeRate(props.pages, props.activePages)

  const [iframePages, totalIframe] =
    props.pages && getIdentifiedIframes(props.pages)

  return (
    <div className="mt-4">
      <div className="mb-4 grid w-full grid-cols-1 justify-center gap-4 md:grid-cols-2">
        <Card>
          <p className="mb-0 text-3xl font-bold">
            {' '}
            {Math.round(iframes).toLocaleString(user?.region?.code)}
            <small>&nbsp;%</small>
          </p>
          <p className="text-sm">
            <Trans>des visites affichées en iframe</Trans>
          </p>
        </Card>
        <Card>
          <p className="mb-0 text-3xl font-bold">
            {' '}
            {Math.round(activeIframes).toLocaleString(user?.region?.code) ||
              '-'}
            <small>&nbsp;%</small>
          </p>
          <p className="text-sm">
            <Trans>des visites en iframe sont actives</Trans>
          </p>
        </Card>
      </div>

      <table className="statistics-iframe-table">
        <tbody>
          <tr>
            <th>
              <Trans>Intégrateurs identifiés</Trans>
            </th>
            <th>
              <Trans>Visites</Trans>
            </th>
            <th>%</th>
          </tr>
          {iframePages &&
            iframePages.map(
              (line, index) =>
                index < 5 && (
                  <tr key={line.label + line.entry_nb_visits}>
                    <td>{line.label}</td>
                    <td>
                      {line.entry_nb_visits
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}
                    </td>
                    <td>
                      {totalIframe &&
                        Math.round(
                          (line.entry_nb_visits / totalIframe) * 10000
                        ) / 100}
                      %
                    </td>
                  </tr>
                )
            )}
        </tbody>
      </table>
      <p className="text-right text-sm font-light">
        <Trans>Données valables pour les 30 derniers jours</Trans>
      </p>
    </div>
  )
}

// for iframe rate we consider as iframe url pages which include 'iframe' and inactive landing pages
const getIframeRate = (pages, activePages) => {
  const totalPages = pages.reduce((acc, cur) => acc + cur.entry_nb_visits, 0)

  const iframePages = pages.filter((page) => page.label?.includes('iframe'))

  const totalIframe = iframePages.reduce(
    (acc, cur) => acc + cur.entry_nb_visits,
    0
  )

  const activeIframePages = activePages.filter((page) =>
    page.label?.includes('iframe')
  )

  const totalActiveIframe = activeIframePages.reduce(
    (acc, cur) => acc + cur.entry_nb_visits,
    0
  )

  // const landingPage = pages.find((obj) => obj.label === '/index')

  // const exitLandingPage = landingPage.exit_nb_visits * 0.6 // 60% of exit are considered as iframes (arbitrary value)

  // const approximatedTotalIframes = exitLandingPage + totalIframe

  const iframes = (totalIframe / totalPages) * 100

  const activeIframes = (totalActiveIframe / totalIframe) * 100

  return [iframes, activeIframes]
}

const getIdentifiedIframes = (pages) => {
  const iframePages = pages
    .filter((page) => page.label?.includes('iframe'))
    .map((page) => {
      if (!page.url) {
        return [...page.subtable]
      } else {
        page.label = page.label.split('/')[3]
        return page
      }
    })
    .flat()

  const combined = iframePages.reduce((a, obj) => {
    if (!a[obj.label]) {
      a[obj.label] = obj
      return a
    } else {
      Object.entries(obj).map(
        ([key, value]) =>
          key !== 'label' &&
          (a[obj.label][key] = (a[obj.label][key] || 0) + value)
      )
      return a
    }
  }, {})

  const totalIframe = Object.values(combined).reduce(
    (acc, cur) => acc + cur.entry_nb_visits,
    0
  )

  return [iframePages, totalIframe]
}
