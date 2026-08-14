import { DomainError } from '@nosgestesclimat/core/lib/errors'

export class CreateGroupError extends DomainError<'create_group_failed'> {
  constructor() {
    super('create_group_failed', 'La création du groupe a échoué')
  }
}
