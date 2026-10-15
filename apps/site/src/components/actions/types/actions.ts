import type { AssessmentStatus } from '@nosgestesclimat/core/features/actions/services/get-personalized-actions-catalogue.service'

export type ActionFrom = 'mes-suggestions' | 'index' | 'mon-plan'

export interface ActionCatalogueContext {
  totalFootprint: number | null | undefined
  assessmentStatus: AssessmentStatus | null | undefined
}
