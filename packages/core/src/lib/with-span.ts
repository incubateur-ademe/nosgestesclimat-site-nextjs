import type { LogMeta, Logger, ScopeName } from '../features/logger/index.ts'

/**
 * What the span and the lines of an operation carry about it: picked from the
 * service's own parameters, as a list of keys or as a function that builds
 * them.
 *
 * A list is checked against the parameters and cannot rename; a function is
 * the way to rename (`{ simulationId: params.id }`) or to mask before binding.
 */
export type SpanBindings<Params> =
  | readonly (keyof Params & string)[]
  | ((params: Params) => LogMeta)

/**
 * Decorates a service so that each call runs in its own span, named by `scope`,
 * with the bindings picked from the arguments. What names the operation on the
 * lines names it on the trace, and the compiler checks that the keys exist.
 *
 * ```ts
 * return withSpan(logger, 'core.service.completeSimulation', ['simulationId'], body)
 * ```
 */
export function withSpan<Params extends object, Result>(
  logger: Logger,
  scope: ScopeName,
  bindings: SpanBindings<Params>,
  service: (params: Params, logger: Logger) => Promise<Result>
): (params: Params) => Promise<Result>
/** Without parameters to pick from: the decorated service takes none. */
export function withSpan<Result>(
  logger: Logger,
  scope: ScopeName,
  service: (logger: Logger) => Promise<Result>
): () => Promise<Result>
export function withSpan(
  logger: Logger,
  scope: ScopeName,
  bindingsOrService:
    | SpanBindings<never>
    | ((logger: Logger) => Promise<unknown>),
  maybeService?: (params: never, logger: Logger) => Promise<unknown>
): (params: never) => Promise<unknown> {
  const [bindings, service] =
    maybeService === undefined
      ? [
          undefined,
          bindingsOrService as (
            params: never,
            logger: Logger
          ) => Promise<unknown>,
        ]
      : [
          bindingsOrService as SpanBindings<never>,
          maybeService as (params: never, logger: Logger) => Promise<unknown>,
        ]

  return (params: never) =>
    logger
      .child(pickBindings(params, bindings))
      .openSpan(scope, (logger) => service(params, logger))
}

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
