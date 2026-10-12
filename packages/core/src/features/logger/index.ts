import { spanDecorator } from './with-span.ts'

/** The levels a logger writes, quietest first. `LogLevel` derives from the list,
 * so a level cannot be added to one without the other. */
export const LOG_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'] as const

export type LogLevel = (typeof LOG_LEVELS)[number]

/** Layers a unit can belong to. Widening this list is deliberate: the values
 * end up in searches and alerts. */
export type ScopeLayer =
  /** Server-side work, whether it is the boundary that validates what came in
   * and calls the service or the work a route reaches. The site files both
   * under `actions/` and `services/`; what triggers it from the browser is an
   * `interaction`, never an `action`. */
  | 'action'
  /** The model being evaluated on the client (publicodes). On the server, the
   * same work belongs to a `service` in `core`, an `action` in `site`. */
  | 'engine'
  /** Server-side work in the `core` workspace, whose layer list the site does
   * not share: there, the same work is an `action`. */
  | 'service'
  | 'middleware'
  | 'instrumentation'
  /** Behaviour in the browser, where a `view` returns markup: an event handler,
   * a hook, an effect. Includes an effect that reaches a server action — that
   * call's own failure is the `action`'s line, not this one. */
  | 'interaction'
  /** A unit that renders: page, layout, error boundary. */
  | 'view'
  | 'sideEffect'
  | 'worker'

/** Workspaces that emit telemetry. */
export type ScopePackage = 'core' | 'site'

/** `<package>.<layer>.<unit>`, e.g. `core.service.engineRegistry`. The shape is
 * compiler-enforced; uniqueness across units is a review rule, and the site has
 * no `service` layer. */
export type ScopeName =
  | `core.${ScopeLayer}.${string}`
  | `site.${Exclude<ScopeLayer, 'service'>}.${string}`

/** Attributes another party named, kept unprefixed (`process.memory.usage`).
 * Ours carry `ngc.` (semconv reserves unprefixed names). */
export type OtelAttributes = Partial<{
  'error.type': string
  'exception.type': string
  'exception.message': string
  'process.memory.usage': number
  'v8js.memory.heap.used': number
  'http.request.method': string
  'http.route': string
  'url.path': string
  posthogDistinctId: string
  sessionId: string
  // Next owns this namespace: its spans carry the same names.
  [key: `next.${string}`]: string
}>

/** Line attributes. Never PII. Scalars query best; structured values become
 * JSON text. Keys are open — the transport prefixes them. */
export type LogMeta = Record<string, unknown> & {
  /**
   * Qualified name of the emitting unit, enforced: a bare name would not
   * compile.
   */
  scope?: ScopeName
}

/** Static context merged into every line of a child logger. */
export type LogBindings = LogMeta

/**
 * What a span attribute accepts: the scalars OTLP defines. Anything structured
 * belongs in a line, where it is flattened and stays queryable.
 */
export type SpanAttributeValue = string | number | boolean

/**
 * What the span and the lines of an operation carry about it, picked from the
 * service's own parameters: a list of keys, or a function that builds them.
 *
 * A list is checked against the parameters and cannot rename; a function is the
 * way to rename (`({ id }) => ({ simulationId: id })`) or to mask before
 * binding.
 */
/** The parameters a decorated service is called with: its own, without the
 * logger the decorator merges in. Distributes over a union of payloads. */
export type WithoutLogger<Params> = Params extends unknown
  ? Omit<Params, 'logger'>
  : never

/** The decorated service. Takes no argument when nothing is left to pass. */
export type DecoratedService<Params, Result> =
  keyof WithoutLogger<Params> extends never
    ? () => Promise<Result>
    : (params: WithoutLogger<Params>) => Promise<Result>

export type SpanBindings<Params> =
  | readonly (Exclude<keyof Params, 'logger'> & string)[]
  | ((params: Params) => LogMeta)

export interface Logger {
  /**
   * New logger with `bindings` merged into every line. Does not mutate the
   * parent.
   */
  child(bindings: LogBindings): Logger
  /**
   * Decorates a parameterless service: each call runs in its own span, named by
   * `scope`, and the body receives the logger bound to it.
   *
   * @param scope Qualified name of the operation, `<package>.<layer>.<unit>`,
   * e.g. `site.action.getUserSession`. It names the span and every line the
   * body writes.
   * @param service The body, taking `{ logger }`.
   * @returns The service to call, taking no argument.
   *
   * @example
   * export const getUserSession = cache(
   *   logger.withSpan('site.action.getUserSession', async ({ logger }) => {
   *     logger.warn('no session header')
   *   })
   * )
   */
  withSpan<Result>(
    scope: ScopeName,
    service: (params: { logger: Logger }) => Promise<Result>
  ): () => Promise<Result>
  /**
   * Decorates a service that takes parameters, binding none of them: use it when
   * the parameters do not name the operation, or when a single call needs no
   * context on its span.
   *
   * @param scope Qualified name of the operation, e.g. `site.action.login`.
   * @param service The body. It receives the caller's parameters, plus `logger`.
   * @returns The service to call, with the same parameters minus `logger`.
   *
   * @example
   * export const login = logger.withSpan(
   *   'site.action.login',
   *   async ({ email, code, logger }) => {
   *     logger.info('login attempt')
   *   }
   * )
   */
  withSpan<Params extends object, Result>(
    scope: ScopeName,
    service: (params: Params) => Promise<Result>
  ): DecoratedService<Params, Result>
  /**
   * Decorates a service, binding the parameters that name the operation. What is
   * bound goes on the span **and** on every line the body writes, so one filter
   * reads the trace and the logs.
   *
   * Bind identifiers and small scalars, never a payload: a bound value lands on
   * both sinks, where logs are billed by volume and PII is the caller's to keep
   * out.
   *
   * @param scope Qualified name of the operation, e.g.
   * `core.service.completeSimulation`.
   * @param bindings Which parameters to bind: the keys to take as they are
   * (`['simulationId', 'model']`), or a function that builds them when they need
   * renaming or masking (`({ id }) => ({ simulationId: id })`). Keys are checked
   * against the parameters.
   * @param service The body. It receives the caller's parameters, plus `logger`.
   * @returns The service to call, with the same parameters minus `logger`.
   *
   * @example
   * export const completeSimulation = logger.withSpan(
   *   'site.action.completeSimulation',
   *   ['simulationId'],
   *   async ({ simulationId, logger }) => {
   *     logger.info('completing')
   *   }
   * )
   */
  withSpan<Params extends object, Result>(
    scope: ScopeName,
    bindings: SpanBindings<Params>,
    service: (params: Params) => Promise<Result>
  ): DecoratedService<Params, Result>
  /** Annotates the span with a measurement (size, branch taken). Only for
   * values unknown before the span opens; known values go in `child` bindings. */
  setSpanAttribute(key: string, value: SpanAttributeValue): void
  debug(message: string, meta?: LogMeta): void
  info(message: string, meta?: LogMeta): void
  /** An anomaly without an `Error`: no stack, so nothing to capture. */
  warn(message: string, meta?: LogMeta): void
  /** An `Error` when caught: keeps its stack. `warn` never reports — a handled
   * anomaly is a line, not an issue. */
  warn(error: Error, meta?: LogMeta): void
  /**
   * Requires an `Error`: a message alone can be neither located nor
   * deduplicated. Always reported: the line and the capture are one event seen
   * by two products, and a failure another net already reported is silenced by
   * that net, not at the call site.
   */
  error(error: Error, meta?: LogMeta): void
  /** Like `error`, for failures the process cannot continue after. */
  fatal(error: Error, meta?: LogMeta): void
}

/**
 * A logger that swallows everything: the default for a caller that does not
 * want to hear about a step.
 */
const noopChild = () => noopLogger

export const noopLogger: Logger = {
  child: noopChild,
  withSpan: spanDecorator((_scope, run) => run(noopLogger)),
  setSpanAttribute: () => {},
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
  fatal: () => {},
}
