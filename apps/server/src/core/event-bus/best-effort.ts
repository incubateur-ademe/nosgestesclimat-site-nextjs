import logger from '../../logger.ts'
import type { EventBusEvent } from './event.ts'
import type { Handler } from './handler.ts'

/**
 * Wraps a handler whose failure must not fail the emitter.
 *
 * `EventBus.once` rejects as soon as one subscriber rejects, and services await
 * it before answering the request. A side effect that is not part of the
 * operation's contract - syncing a third party, sending a notification - would
 * otherwise turn an already committed, successful operation into an error
 * response, and leave the user retrying something that in fact succeeded.
 */
export const bestEffort =
  <SubscribedEvent extends EventBusEvent>(
    name: string,
    handler: Handler<SubscribedEvent>
  ): Handler<SubscribedEvent> =>
  async (event) => {
    try {
      return await handler(event)
    } catch (error) {
      logger.error(`Best effort handler failed for "${name}"`, error)
    }
  }
