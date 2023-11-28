export function getTextColor(category?: string | null) {
  switch (category) {
    case 'transport':
      return `text-categories-transport`
    case 'alimentation':
      return `text-categories-alimentation`
    case 'logement':
      return `text-categories-logement`
    case 'divers':
      return `text-categories-divers`
    case 'services sociétaux':
      return `text-categories-servicessocietaux`
    default:
      return 'text-primary-500'
  }
}
export function getBackgroundColor(category?: string | null) {
  switch (category) {
    case 'transport':
      return `bg-categories-transport`
    case 'alimentation':
      return `bg-categories-alimentation`
    case 'logement':
      return `bg-categories-logement`
    case 'divers':
      return `bg-categories-divers`
    case 'services sociétaux':
      return `bg-categories-servicessocietaux`
    default:
      return 'bg-primary-500'
  }
}
export function getBorderColor(category?: string | null) {
  switch (category) {
    case 'transport':
      return `border-categories-transport`
    case 'alimentation':
      return `border-categories-alimentation`
    case 'logement':
      return `border-categories-logement`
    case 'divers':
      return `border-categories-divers`
    case 'services sociétaux':
      return `border-categories-servicessocietaux`
    default:
      return 'border-primary-500'
  }
}
export function getFillColor(category?: string | null) {
  switch (category) {
    case 'transport':
      return `fill-categories-transport`
    case 'alimentation':
      return `fill-categories-alimentation`
    case 'logement':
      return `fill-categories-logement`
    case 'divers':
      return `fill-categories-divers`
    case 'services sociétaux':
      return `fill-categories-servicessocietaux`
    default:
      return 'fill-primary-500'
  }
}
