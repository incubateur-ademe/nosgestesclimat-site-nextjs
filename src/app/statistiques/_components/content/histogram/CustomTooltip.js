import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import TransClient from '@/components/translation/TransClient'
import {
  getLangFromAbreviation,
  getLangInfos,
} from '../../../../locales/translation'

const Number = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
`
export default function CustomTooltip(props) {
  const label = props.label && props.label.replace(/\s/g, ' ')
  const { t, i18n } = useTranslation()
  const currentLangInfos = getLangInfos(getLangFromAbreviation(i18n.language))

  return props.active && props.payload && props.payload.length ? (
    <div className="border border-[#f0f0f0] bg-white p-4">
      {label === '30+ min' ? (
        <div className="text-[#6a6a6a]">
          <TransClient>Plus de 30 minutes</TransClient>
        </div>
      ) : (
        <div className="text-[#6a6a6a]">
          {t('Entre') + ' '}
          {label.split('-')[0].toLocaleString(currentLangInfos.abrvLocale)}{' '}
          {t('et') + ' '}
          {label
            .split('-')[1]
            .split(' ')[0]
            .toLocaleString(currentLangInfos.abrvLocale)}{' '}
          {t('minutes')}
        </div>
      )}
      <span className="text-lg font-bold">
        {props.payload[0].value
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}{' '}
      </span>
      {props.naming || t('visites')}
    </div>
  ) : null
}
