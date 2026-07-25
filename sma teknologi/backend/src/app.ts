import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import { config } from './config/env'
import { errorHandler } from './middlewares/error-handler'
import { notFound } from './middlewares/not-found'
import { requestLogger } from './middlewares/logger'
import { apiRoutes } from './modules'
import { corsOptions } from './config/cors'
import { helmetOptions } from './config/helmet'

const app = express()

app.set('trust proxy', 1)

app.use(helmet(helmetOptions))
app.use(cors(corsOptions))
app.use(compression())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(morgan('combined', { stream: { write: (msg) => config.logger.info(msg.trim()) } }))
app.use(requestLogger)

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: { success: false, message: 'Terlalu banyak permintaan, coba lagi nanti' },
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/', limiter)

app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() })
})

app.use('/api/v1', apiRoutes)

app.use(notFound)
app.use(errorHandler)

export default app