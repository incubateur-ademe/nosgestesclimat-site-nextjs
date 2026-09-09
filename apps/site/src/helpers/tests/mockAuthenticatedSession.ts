import { v4 as randomUUID } from 'uuid'
import { vi } from 'vitest'

import type { AnonUser, AuthUser } from '@/services/auth/get-user-session'
import { getUserSession } from '@/services/auth/get-user-session'

export function mockAuthenticatedSession({
  userId = randomUUID(),
  type = 'verified',
}: {
  userId?: string
  type?: 'verified' | 'unverified'
} = {}): string {
  vi.mocked(getUserSession).mockResolvedValue(
    type === 'unverified'
      ? ({ id: userId, isAuth: false } satisfies AnonUser)
      : ({
          id: userId,
          email: `${userId}@example.com`,
          isAuth: true,
        } satisfies AuthUser)
  )
  return userId
}
