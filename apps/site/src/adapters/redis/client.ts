import { env } from '@/env/server'
import logger from '@/logger/logger.server'
import { toError } from '@nosgestesclimat/core/lib/to-error'
import { Redis } from 'ioredis'

export const redisClientFactory = () =>
  new Redis(env.REDIS_URL, {
    lazyConnect: true,

    // Stricter retries and timeouts to avoid hanging throttled server actions
    maxRetriesPerRequest: 2,
    connectTimeout: 2_500,
    commandTimeout: 2_500,
  }).on('error', (error) => {
    logger.error(toError(error))
  })

export const redis = redisClientFactory()
