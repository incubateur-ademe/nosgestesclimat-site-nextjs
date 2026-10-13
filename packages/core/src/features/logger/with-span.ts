import type { Logger, LogMeta, ScopeName, SpanBindings } from './index.ts'

/**
 * Opens a span around a body, with `bindings` on the span and on its lines, and
 * hands the body a logger bound to both.
 */
type SpanOpener = <Result>(
  scope: ScopeName,
  run: (logger: Logger) => Promise<Result>,
  bindings: LogMeta
) => Promise<Result>

/**
 * Builds the `withSpan` decorator over the one thing only a runtime knows: how
 * to open a span. One implementation, four runtimes.
 */
export const spanDecorator = (openSpan: SpanOpener): Logger['withSpan'] =>
  ((scope: ScopeName, bindingsOrService: unknown, maybeService?: unknown) => {
    // Two call shapes: the bindings then the service, or the service alone.
    const bindings = (
      maybeService === undefined ? undefined : bindingsOrService
    ) as SpanBindings<Record<string, unknown>> | undefined

    const service = (
      maybeService === undefined ? bindingsOrService : maybeService
    ) as (
      params: Record<string, unknown> & { logger: Logger }
    ) => Promise<unknown>

    return (params: Record<string, unknown>) =>
      openSpan(
        scope,
        (logger) => service({ ...params, logger }),
        pickBindings(params, bindings)
      )
  }) as Logger['withSpan']

/** The bindings of one call, picked from its parameters. */
export const pickBindings = <Params>(
  params: Params,
  bindings: SpanBindings<Params> | undefined
): LogMeta =>
  bindings === undefined
    ? {}
    : typeof bindings === 'function'
      ? bindings(params)
      : Object.fromEntries(
          bindings.map((key) => [key, (params as Record<string, unknown>)[key]])
        )
