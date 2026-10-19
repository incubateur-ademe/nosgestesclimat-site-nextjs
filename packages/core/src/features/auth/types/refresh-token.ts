export interface CreateRefreshTokenData {
  userId: string
  token: string
  expiresAt: Date
  id?: string
  createdAt?: Date
}

/** The row a rotation rewrote. */
export interface RotatedToken {
  id: string
  userId: string
  rotatedAt: Date
}
