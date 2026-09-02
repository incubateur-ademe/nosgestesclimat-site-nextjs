import type { RequestHandler } from 'express'
import type { ParamsDictionary, Query } from 'express-serve-static-core'
import { StatusCodes } from 'http-status-codes'
import * as v from 'valibot'
import { config } from '../config.ts'

export const authentificationMiddleware =
  <
    ReqParams = ParamsDictionary,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = Query,
  >({
    passIfUnauthorized,
    requireUserId = true,
  }: {
    /** Should only be used for endpoints that accept unauthenticated requests but need `req.user` if there is one */
    passIfUnauthorized?: true
    /**
     * Whether the request must carry an `x-user-id` header. Set to false on
     * endpoints that accept requests without an identity (e.g. anonymous
     * signup on `/login`).
     */
    requireUserId?: boolean
  } = {}): RequestHandler<ReqParams, ResBody, ReqBody, ReqQuery> =>
  (req, res, next) => {
    const unauthorized = () =>
      passIfUnauthorized ? next() : res.status(StatusCodes.UNAUTHORIZED).end()

    const providedInternalKey = req.headers['x-internal-key']

    if (providedInternalKey !== config.security.internalApiKey) {
      return unauthorized()
    }

    const id = req.headers['x-user-id']

    if (typeof id !== 'string') {
      if (!requireUserId) {
        return next()
      }
      return unauthorized()
    }

    const parsedId = v.safeParse(v.pipe(v.string(), v.uuid()), id)
    if (!parsedId.success) {
      return res.status(StatusCodes.BAD_REQUEST).end()
    }

    const email = req.headers['x-user-email']

    req.user =
      typeof email === 'string'
        ? { id: parsedId.output, email }
        : { id: parsedId.output }

    return next()
  }
