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
      return 'text-default'
  }
}

export function getTextDarkColor(category?: string | null) {
  switch (category) {
    case 'transport':
      return `text-transport-800`
    case 'alimentation':
      return `text-alimentation-800`
    case 'logement':
      return `text-logement-800`
    case 'divers':
      return `text-divers-800`
    case 'services sociétaux':
      return `text-servicessocietaux-800`
    default:
      return 'text-primary-800'
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

export function getHoverBackgroundColor(category?: string | null) {
  switch (category) {
    case 'transport':
      return `hover:bg-categories-transport`
    case 'alimentation':
      return `hover:bg-categories-alimentation`
    case 'logement':
      return `hover:bg-categories-logement`
    case 'divers':
      return `hover:bg-categories-divers`
    case 'services sociétaux':
      return `hover:bg-categories-servicessocietaux`
    default:
      return 'hover:bg-primary-700'
  }
}

export function getBackgroundLightColor(category?: string | null) {
  switch (category) {
    case 'transport':
      return `bg-transport-100`
    case 'alimentation':
      return `bg-alimentation-100`
    case 'logement':
      return `bg-logement-100`
    case 'divers':
      return `bg-divers-100`
    case 'services sociétaux':
      return `bg-servicessocietaux-100`
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

export function getCategoryColorClasses(category?: string | null) {
  return {
    text: getTextColor(category),
    textDark: getTextDarkColor(category),
    background: getBackgroundColor(category),
    hoverBackground: getHoverBackgroundColor(category),
    backgroundLight: getBackgroundLightColor(category),
    border: getBorderColor(category),
    fill: getFillColor(category),
  }
}
