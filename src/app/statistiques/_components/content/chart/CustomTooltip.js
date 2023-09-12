import { useTranslation } from 'react-i18next'

import {
  getLangFromAbreviation,
  getLangInfos,
} from '../../../../locales/translation'

export default function CustomTooltip(props) {
  const { t, i18n } = useTranslation()
  const currentLangInfos = getLangInfos(getLangFromAbreviation(i18n.language))

  return props.active && props.payload && props.payload.length ? (
    <div className="border border-[#f0f0f0] p-4">
      {props.period === 'week' && (
        <span>
          Semaine du{' '}
          {new Date(props.label.split(',')[0]).toLocaleDateString(
            currentLangInfos.abrvLocale,
            {
              day: '2-digit',
              month: '2-digit',
            }
          )}{' '}
          au{' '}
          {new Date(props.label.split(',')[1]).toLocaleDateString(
            currentLangInfos.abrvLocale,
            {
              day: '2-digit',
              month: '2-digit',
            }
          )}
        </span>
      )}
      {props.period === 'month' && (
        <span>
          {new Date(props.label).toLocaleDateString(
            currentLangInfos.abrvLocale,
            {
              month: 'long',
              year: 'numeric',
            }
          )}
        </span>
      )}
      {props.period === 'day' && (
        <span>
          {new Date(props.label).toLocaleDateString(
            currentLangInfos.abrvLocale,
            {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
            }
          )}
        </span>
      )}
      <div>
        {props.payload[0].value
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}{' '}
      </div>
      {props.naming || t('visites')}
    </div>
  ) : null
}
