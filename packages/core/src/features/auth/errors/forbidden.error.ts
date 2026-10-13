import { DomainError } from '../../../lib/errors.ts'

export class ForbiddenError extends DomainError<'forbidden'> {
  public readonly resourceId?: string

  constructor(params: { resourceId?: string } = {}) {
    super('forbidden', 'Forbidden')
    this.resourceId = params.resourceId
  }
}
