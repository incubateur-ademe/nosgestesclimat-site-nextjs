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

export function getBackgroundDarkColor(category?: string | null) {
  switch (category) {
    case 'transport':
      return `bg-transport-700`
    case 'alimentation':
      return `bg-alimentation-700`
    case 'logement':
      return `bg-logement-700`
    case 'divers':
      return `bg-divers-700`
    case 'services sociétaux':
      return `bg-servicessocietaux-700`
    default:
      return 'bg-primary-700'
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
export function getBorderLightColor(category?: string | null) {
  switch (category) {
    case 'transport':
      return `border-transport-100`
    case 'alimentation':
      return `border-alimentation-100`
    case 'logement':
      return `border-logement-100`
    case 'divers':
      return `border-divers-100`
    case 'services sociétaux':
      return `border-servicessocietaux-100`
    default:
      return 'border-primary-100'
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
    textDark: getTextDarkColor(category),
    background: getBackgroundColor(category),
    hoverBackground: getHoverBackgroundColor(category),
    backgroundLight: getBackgroundLightColor(category),
    border: getBorderColor(category),
    fill: getFillColor(category),
  }
}

export function getBgCategoryColor(
  category?: string | null,
  variation:
    | '50'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | '950' = '500'
) {
  switch (category) {
    case 'transport':
      return `bg-transport-${variation}`
    case 'alimentation':
      return `bg-alimentation-${variation}`
    case 'logement':
      return `bg-logement-${variation}`
    case 'divers':
      return `bg-divers-${variation}`
    case 'services sociétaux':
      return `bg-servicessocietaux-${variation}`
    default:
      return `bg-primary-${variation}`
  }
}

export function getHoverBgCategoryColor(
  category?: string | null,
  variation:
    | '50'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | '950' = '300'
) {
  switch (category) {
    case 'transport':
      switch (variation) {
        case '50':
          return 'hover:bg-transport-50'
        case '100':
          return 'hover:bg-transport-100'
        case '200':
          return 'hover:bg-transport-200'
        case '300':
          return 'hover:bg-transport-300'
        case '400':
          return 'hover:bg-transport-400'
        case '500':
          return 'hover:bg-transport-500'
        case '600':
          return 'hover:bg-transport-600'
        case '700':
          return 'hover:bg-transport-700'
        case '800':
          return 'hover:bg-transport-800'
        case '900':
          return 'hover:bg-transport-900'
        case '950':
          return 'hover:bg-transport-950'
      }
      break
    case 'alimentation':
      switch (variation) {
        case '50':
          return 'hover:bg-alimentation-50'
        case '100':
          return 'hover:bg-alimentation-100'
        case '200':
          return 'hover:bg-alimentation-200'
        case '300':
          return 'hover:bg-alimentation-300'
        case '400':
          return 'hover:bg-alimentation-400'
        case '500':
          return 'hover:bg-alimentation-500'
        case '600':
          return 'hover:bg-alimentation-600'
        case '700':
          return 'hover:bg-alimentation-700'
        case '800':
          return 'hover:bg-alimentation-800'
        case '900':
          return 'hover:bg-alimentation-900'
        case '950':
          return 'hover:bg-alimentation-950'
      }
      break
    case 'logement':
      switch (variation) {
        case '50':
          return 'hover:bg-logement-50'
        case '100':
          return 'hover:bg-logement-100'
        case '200':
          return 'hover:bg-logement-200'
        case '300':
          return 'hover:bg-logement-300'
        case '400':
          return 'hover:bg-logement-400'
        case '500':
          return 'hover:bg-logement-500'
        case '600':
          return 'hover:bg-logement-600'
        case '700':
          return 'hover:bg-logement-700'
        case '800':
          return 'hover:bg-logement-800'
        case '900':
          return 'hover:bg-logement-900'
        case '950':
          return 'hover:bg-logement-950'
      }
      break
    case 'divers':
      switch (variation) {
        case '50':
          return 'hover:bg-divers-50'
        case '100':
          return 'hover:bg-divers-100'
        case '200':
          return 'hover:bg-divers-200'
        case '300':
          return 'hover:bg-divers-300'
        case '400':
          return 'hover:bg-divers-400'
        case '500':
          return 'hover:bg-divers-500'
        case '600':
          return 'hover:bg-divers-600'
        case '700':
          return 'hover:bg-divers-700'
        case '800':
          return 'hover:bg-divers-800'
        case '900':
          return 'hover:bg-divers-900'
        case '950':
          return 'hover:bg-divers-950'
      }
      break
    case 'services sociétaux':
      switch (variation) {
        case '50':
          return 'hover:bg-servicessocietaux-50'
        case '100':
          return 'hover:bg-servicessocietaux-100'
        case '200':
          return 'hover:bg-servicessocietaux-200'
        case '300':
          return 'hover:bg-servicessocietaux-300'
        case '400':
          return 'hover:bg-servicessocietaux-400'
        case '500':
          return 'hover:bg-servicessocietaux-500'
        case '600':
          return 'hover:bg-servicessocietaux-600'
        case '700':
          return 'hover:bg-servicessocietaux-700'
        case '800':
          return 'hover:bg-servicessocietaux-800'
        case '900':
          return 'hover:bg-servicessocietaux-900'
        case '950':
          return 'hover:bg-servicessocietaux-950'
      }
      break
    default:
      switch (variation) {
        case '50':
          return 'hover:bg-primary-50'
        case '100':
          return 'hover:bg-primary-100'
        case '200':
          return 'hover:bg-primary-200'
        case '300':
          return 'hover:bg-primary-300'
        case '400':
          return 'hover:bg-primary-400'
        case '500':
          return 'hover:bg-primary-500'
        case '600':
          return 'hover:bg-primary-600'
        case '700':
          return 'hover:bg-primary-700'
        case '800':
          return 'hover:bg-primary-800'
        case '900':
          return 'hover:bg-primary-900'
        case '950':
          return 'hover:bg-primary-950'
      }
  }
}

export function getBorderCategoryColor(
  category?: string | null,
  variation:
    | '50'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | '950' = '500'
) {
  switch (category) {
    case 'transport':
      return `border-transport-${variation}`
    case 'alimentation':
      return `border-alimentation-${variation}`
    case 'logement':
      return `border-logement-${variation}`
    case 'divers':
      return `border-divers-${variation}`
    case 'services sociétaux':
      return `border-servicessocietaux-${variation}`
    default:
      return `border-primary-${variation}`
  }
}

export function getHoverBorderCategoryColor(
  category?: string | null,
  variation:
    | '50'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | '950' = '300'
) {
  switch (category) {
    case 'transport':
      switch (variation) {
        case '50':
          return 'hover:border-transport-50'
        case '100':
          return 'hover:border-transport-100'
        case '200':
          return 'hover:border-transport-200'
        case '300':
          return 'hover:border-transport-300'
        case '400':
          return 'hover:border-transport-400'
        case '500':
          return 'hover:border-transport-500'
        case '600':
          return 'hover:border-transport-600'
        case '700':
          return 'hover:border-transport-700'
        case '800':
          return 'hover:border-transport-800'
        case '900':
          return 'hover:border-transport-900'
        case '950':
          return 'hover:border-transport-950'
      }
      break
    case 'alimentation':
      switch (variation) {
        case '50':
          return 'hover:border-alimentation-50'
        case '100':
          return 'hover:border-alimentation-100'
        case '200':
          return 'hover:border-alimentation-200'
        case '300':
          return 'hover:border-alimentation-300'
        case '400':
          return 'hover:border-alimentation-400'
        case '500':
          return 'hover:border-alimentation-500'
        case '600':
          return 'hover:border-alimentation-600'
        case '700':
          return 'hover:border-alimentation-700'
        case '800':
          return 'hover:border-alimentation-800'
        case '900':
          return 'hover:border-alimentation-900'
        case '950':
          return 'hover:border-alimentation-950'
      }
      break
    case 'logement':
      switch (variation) {
        case '50':
          return 'hover:border-logement-50'
        case '100':
          return 'hover:border-logement-100'
        case '200':
          return 'hover:border-logement-200'
        case '300':
          return 'hover:border-logement-300'
        case '400':
          return 'hover:border-logement-400'
        case '500':
          return 'hover:border-logement-500'
        case '600':
          return 'hover:border-logement-600'
        case '700':
          return 'hover:border-logement-700'
        case '800':
          return 'hover:border-logement-800'
        case '900':
          return 'hover:border-logement-900'
        case '950':
          return 'hover:border-logement-950'
      }
      break
    case 'divers':
      switch (variation) {
        case '50':
          return 'hover:border-divers-50'
        case '100':
          return 'hover:border-divers-100'
        case '200':
          return 'hover:border-divers-200'
        case '300':
          return 'hover:border-divers-300'
        case '400':
          return 'hover:border-divers-400'
        case '500':
          return 'hover:border-divers-500'
        case '600':
          return 'hover:border-divers-600'
        case '700':
          return 'hover:border-divers-700'
        case '800':
          return 'hover:border-divers-800'
        case '900':
          return 'hover:border-divers-900'
        case '950':
          return 'hover:border-divers-950'
      }
      break
    case 'services sociétaux':
      switch (variation) {
        case '50':
          return 'hover:border-servicessocietaux-50'
        case '100':
          return 'hover:border-servicessocietaux-100'
        case '200':
          return 'hover:border-servicessocietaux-200'
        case '300':
          return 'hover:border-servicessocietaux-300'
        case '400':
          return 'hover:border-servicessocietaux-400'
        case '500':
          return 'hover:border-servicessocietaux-500'
        case '600':
          return 'hover:border-servicessocietaux-600'
        case '700':
          return 'hover:border-servicessocietaux-700'
        case '800':
          return 'hover:border-servicessocietaux-800'
        case '900':
          return 'hover:border-servicessocietaux-900'
        case '950':
          return 'hover:border-servicessocietaux-950'
      }
      break
    default:
      switch (variation) {
        case '50':
          return 'hover:border-primary-50'
        case '100':
          return 'hover:border-primary-100'
        case '200':
          return 'hover:border-primary-200'
        case '300':
          return 'hover:border-primary-300'
        case '400':
          return 'hover:border-primary-400'
        case '500':
          return 'hover:border-primary-500'
        case '600':
          return 'hover:border-primary-600'
        case '700':
          return 'hover:border-primary-700'
        case '800':
          return 'hover:border-primary-800'
        case '900':
          return 'hover:border-primary-900'
        case '950':
          return 'hover:border-primary-950'
      }
      break
  }
}

export function getTextCategoryColor(
  category?: string | null,
  variation:
    | '50'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | '950' = '500'
) {
  switch (category) {
    case 'transport':
      return `text-transport-${variation}`
    case 'alimentation':
      return `text-alimentation-${variation}`
    case 'logement':
      return `text-logement-${variation}`
    case 'divers':
      return `text-divers-${variation}`
    case 'services sociétaux':
      return `text-servicessocietaux-${variation}`
    default:
      return `text-primary-${variation}`
  }
}
