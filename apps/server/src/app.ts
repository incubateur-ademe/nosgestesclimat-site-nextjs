import cors from 'cors'
import type { Request } from 'express'
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import morgan from 'morgan'
import path from 'path'
import requestIp from 'request-ip'
import { allowedOrigins } from './config.ts'
import { isAllowedOrigin } from './core/allowed-urls.ts'
import groupsController from './features/groups/groups.controller.ts'
import modeleController from './features/modele/modele.controller.ts'
import newslettersController from './features/newsletter/newsletter.controller.ts'
import organisationController from './features/organisations/organisations.controller.ts'
import simulationController from './features/simulations/simulations.controller.ts'
import statsController from './features/stats/stats.controller.ts'
import usersController from './features/users/users.controller.ts'
import logger, { redactBody } from './logger.ts'

const app = express()

app.use(express.static(path.join(import.meta.dirname, 'public')))
app.use(express.json())

app.use((req, _, next) => {
  req.requestParams = JSON.stringify({
    body: redactBody({ ...req.body }),
    query: { ...req.query },
    params: { ...req.params },
  })

  return next()
})

app.use(
  cors({
    origin: (origin, callback) =>
      callback(null, origin ? isAllowedOrigin(origin, allowedOrigins) : false),
    credentials: true,
  })
)

app.use(requestIp.mw())

morgan.token('params', (req: Request) => req.requestParams)

morgan.token('ip', (req: Request) => (req.clientIp ? '[REDACTED]' : ''))

app.use(
  morgan(
    '{"method":":method","url":":url","ip"::ip,"params"::params,"status":":status","resContentLength":":res[content-length]","reponseTime":":response-time ms"}',
    {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    }
  )
)

app.use('/modele', modeleController)
app.use('/groups', groupsController)
app.use('/newsletters', newslettersController)
app.use('/organisations', organisationController)
app.use('/simulations', simulationController)
app.use('/stats', statsController)
app.use('/users', usersController)

// public routes
app.get('/api/stats', (_, res) =>
  res.redirect(StatusCodes.MOVED_PERMANENTLY, '/stats/v1/northstar')
)

export default app
