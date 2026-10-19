import type { Theme } from '@nosgestesclimat/core/features/actions/types/theme'

export const classesByTheme: Record<
  Theme['key'],
  Record<'section' | 'header' | 'icon' | 'planCard', string>
> = {
  transport: {
    section: 'bg-transport-50 border-transport-200',
    header: 'text-transport-800',
    icon: 'bg-transport-200 text-transport-800',
    planCard: 'border-transport-200 border-l-transport-400',
  },
  food: {
    section: 'bg-alimentation-50 border-alimentation-200',
    header: 'text-alimentation-800',
    icon: 'bg-alimentation-200 text-alimentation-800',
    planCard: 'border-alimentation-200 border-l-alimentation-400',
  },
  housing: {
    section: 'bg-logement-50 border-logement-200',
    header: 'text-logement-800',
    icon: 'bg-logement-200 text-logement-800',
    planCard: 'border-logement-200 border-l-logement-400',
  },
  misc: {
    section: 'bg-divers-50 border-divers-200',
    header: 'text-divers-800',
    icon: 'bg-divers-200 text-divers-800',
    planCard: 'border-divers-200 border-l-divers-400',
  },
  societal_services: {
    section: 'bg-servicessocietaux-50 border-servicessocietaux-200',
    header: 'text-servicessocietaux-800',
    icon: 'bg-servicessocietaux-200 text-servicessocietaux-800',
    planCard: 'border-servicessocietaux-200 border-l-servicessocietaux-400',
  },
}
