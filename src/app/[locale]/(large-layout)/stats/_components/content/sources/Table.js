import Trans from '@/components/translation/Trans'
import { useLocale } from '@/hooks/useLocale'
export default function Table(props) {
  const locale = useLocale()
  return (
    <div>
      <div>
        <table className="statistics-table">
          <tbody>
            <tr>
              <th>{props.title} </th>
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
          <Trans locale={locale}>Données valables pour le mois en cours</Trans>
        </p>
      </div>
    </div>
  )
}
