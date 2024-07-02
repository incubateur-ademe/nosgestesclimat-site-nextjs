type Props = {
  name: string
  value: string
  options: Array<{
    label: string
    value: string
    disabled?: boolean
  }>
  suffix?: string
  onChange: (value: string) => void
}

export default function FancySelect({
  name,
  value,
  options,
  suffix,
  onChange,
}: Props) {
  return (
    <div className="relative inline-block text-secondary-700">
      <span
        dangerouslySetInnerHTML={{
          __html: options.find((option) => option.value === value)
            ? options.find((option) => option.value === value)?.label +
              (suffix ? ' ' + suffix : '')
            : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
        }}
      />
      <select
        className="absolute left-0 top-0 h-full w-full cursor-pointer appearance-none border-none bg-transparent text-transparent opacity-0 shadow-sm"
        id={name}
        name={name}
        value={value ? value : ''}
        onChange={(e) => {
          onChange(e.target.value)
        }}>
        {options.map((option, index) => (
          <option
            className="text-secondary-700"
            key={option.value + '-' + index}
            value={option.value}
            disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
