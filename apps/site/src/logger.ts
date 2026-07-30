/* eslint-disable no-console */
import type { Logger } from '@nosgestesclimat/core/features/logger/index'

// TODO: use a real logger
const logger: Logger = {
  error: (message, meta) => console.error(message, meta ?? ''),
  info: (message, meta) => console.log(message, meta ?? ''),
  debug: (message, meta) => console.log(message, meta ?? ''),
}

export default logger
