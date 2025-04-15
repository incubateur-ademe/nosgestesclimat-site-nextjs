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
  ...props
}: Props) {
  return (
    <div className="text-secondary-700 relative inline-block">
      <span
        dangerouslySetInnerHTML={{
          __html: options.find((option) => option.value === value)
            ? options.find((option) => option.value === value)?.label +
              (suffix ? ' ' + suffix : '')
            : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
        }}
      />
      <select
        className="absolute top-0 left-0 h-full w-full cursor-pointer appearance-none border-none bg-transparent text-transparent opacity-0 shadow-xs"
        id={name}
        name={name}
        value={value ? value : ''}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        {...props}>
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
