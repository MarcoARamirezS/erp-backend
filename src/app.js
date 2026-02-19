import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import { env, assertEnv } from './config/env.js'
import { requestId } from './middlewares/requestId.js'
import { httpLogger } from './middlewares/httpLogger.js'
import { rateLimit } from './middlewares/rateLimit.js'
import { errorHandler } from './middlewares/errorHandler.js'

import routes from './routes/index.js'

assertEnv()

const app = express()

app.use(requestId)
app.use(httpLogger)

app.use(helmet())
app.use(cors({ origin: env.CORS_ORIGINS.length ? env.CORS_ORIGINS : true }))

app.use(rateLimit({ windowMs: 60_000, max: 180 }))
app.use(express.json({ limit: '2mb' }))

app.get('/health', (req, res) => res.json({ ok: true, env: env.NODE_ENV }))

app.use('/api', routes)

app.use(errorHandler)

export default app
