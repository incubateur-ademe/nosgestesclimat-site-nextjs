export function getTextColor(category?: string | null) {
  switch (category) {
    case 'transport':
      return `text-categories-text-transport`
    case 'alimentation':
      return `text-categories-text-alimentation`
    case 'logement':
      return `text-categories-text-logement`
    case 'divers':
      return `text-categories-text-divers`
    case 'services sociétaux':
      return `text-categories-text-servicessocietaux`
    default:
      return 'text-primary-700'
  }
}

export function getTextDarkColor(category?: string | null) {
  switch (category) {
    case 'transport':
      return `text-blue-evenDarker`
    case 'alimentation':
      return `text-orange-evenDarker`
    case 'logement':
      return `text-emerald-evenDarker`
    case 'divers':
      return `text-yellow-evenDarker`
    case 'services sociétaux':
      return `text-lavender-evenDarker`
    default:
      return 'text-primary-700'
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
      return 'bg-primary-700'
  }
}

export function getBackgroundLightColor(category?: string | null) {
  switch (category) {
    case 'transport':
      return `bg-blue-light`
    case 'alimentation':
      return `bg-orange-light`
    case 'logement':
      return `bg-emerald-light`
    case 'divers':
      return `bg-yellow-light`
    case 'services sociétaux':
      return `bg-lavender-light`
    default:
      return 'bg-primary-100'
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
      return 'border-primary-700'
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
      return 'fill-primary-700'
  }
}
