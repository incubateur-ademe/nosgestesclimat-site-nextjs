type LoaderSizes = 'sm' | 'md' | 'lg'

type Props = {
  size?: LoaderSizes
  color?: 'light' | 'dark'
  className?: string
}

export default function Loader({
  size = 'md',
  color = 'light',
  className,
}: Props) {
  // Check global.css for the definition of the loader class
  return <span className={`loader as-${size} as-${color} ${className}`} />
}
