import { DomainError } from '@nosgestesclimat/core/lib/errors'

export class SubmissionError extends DomainError<'submission'> {
  constructor() {
    super('submission', 'Erreur lors de la création du test collectif')
  }
}
