import Trans from '@/components/translation/Trans'

export default function Table(props) {
  return (
    <div>
      <div>
        <table className="statistics-table">
          <tbody>
            <tr>
              <th>
                {props.title}{' '}
                {props.setNewWebsites && (
                  <button
                    className="m-0 inline cursor-pointer border-none bg-none p-0 text-sm text-primary-700"
                    onClick={() =>
                      props.setNewWebsites(
                        (prevNewWebsites) => !prevNewWebsites
                      )
                    }>
                    ({props.newWebsites ? 'Voir tous' : 'Voir les nouveaux'})
                  </button>
                )}
              </th>
              <th>Visites</th>
              <th>%</th>
            </tr>
            {props.data &&
              props.data.length > 0 &&
              props.data.map(
                (line, index) =>
                  (!props.limit || index < props.limit) && (
                    <tr key={line.label + line.nb_visits}>
                      <td>{line.label}</td>
                      <td>
                        {line.nb_visits
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}
                      </td>
                      <td>
                        {props.total &&
                          Math.round((line.nb_visits / props.total) * 10000) /
                            100}
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
    </div>
  )
}
