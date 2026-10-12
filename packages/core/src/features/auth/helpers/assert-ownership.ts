import { ForbiddenError } from '../errors/forbidden.error.ts'

export function assertOwnership(
  sessionUserId: string | undefined,
  resourceUserId: string
): void {
  if (!sessionUserId || sessionUserId !== resourceUserId) {
    throw new ForbiddenError({
      resourceId: resourceUserId,
    })
  }
}
