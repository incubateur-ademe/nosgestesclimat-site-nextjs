'use client'
import { carboneMetric, eauMetric } from '@/constants/metric'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { Metrics } from '@incubateur-ademe/nosgestesclimat'
import Select, { Options, components } from 'react-select'
import Trans from '../translation/Trans'

interface OptionType {
  value: string
  label: string
  icon: string
}

export default function FootprintSelector({
  footprintSelected,
  onChange,
}: {
  footprintSelected: Metrics
  onChange: (footprint: Metrics) => void
}) {
  const { t } = useClientTranslation()

  const options: Options<OptionType> = [
    { value: carboneMetric, label: t('Carbone'), icon: '🌡️' },
    { value: eauMetric, label: t('Eau'), icon: '💧' },
  ]

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: '0.5rem',
      borderWidth: '2px',
      borderColor: '#4949ba',
      // backgroundColor: '#e3ebfc',
      minWidth: '7rem',
      paddingTop: '0',
      paddingBottom: '0',
      color: '#373978',
      cursor: 'pointer',
      fontSize: '0.875rem',
      '&:hover': {
        borderColor: '#3d3f96',
        backgroundColor: '#e3ebfc',
      },
      transition: 'all 0.2s ease-in-out',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      margin: '-0.2rem',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#3d3f96',
      '&:hover': {
        color: '#3d3f96',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#3d3f96',
      fontWeight: 'bold',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0',
      paddingLeft: '0.5rem',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      backgroundColor: state.isSelected ? '#737de1' : provided.backgroundColor,
      color: state.isSelected ? 'white' : provided.color,
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '0.5rem',
    }),
  }

  const customComponents = {
    SingleValue: ({ children, ...props }: any) => (
      <components.SingleValue {...props}>
        <div className="flex flex-col">
          <div
            id="footprint-select-label"
            className="-mb-1 cursor-pointer select-none text-[0.6rem] font-normal text-default">
            <Trans>Empreinte</Trans>
          </div>

          <div className="flex items-center">{children}</div>
        </div>
      </components.SingleValue>
    ),
  }

  return (
    <div className="relative rounded-lg">
      <div className="relative block h-full">
        <Select
          aria-labelledby="footprint-select-label"
          inputId="footprint-select-input"
          options={options}
          isClearable={false}
          isSearchable={false}
          value={options.find((option) => option.value === footprintSelected)}
          onChange={(selected) => onChange((selected?.value as Metrics) || '')}
          styles={customStyles}
          components={customComponents}
          formatOptionLabel={({ label, icon }) => (
            <div className="flex items-center">
              {label} <Emoji>{icon}</Emoji>
            </div>
          )}
        />
      </div>
    </div>
  )
}
