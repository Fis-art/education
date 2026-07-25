import 'dotenv/config'
import app from './app'
import { logger } from './shared/utils/logger'
import { connectDatabase } from './shared/database/knex'
import { connectRedis } from './config/redis'

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await connectDatabase()
    logger.info('Database connected successfully')

    await connectRedis()
    logger.info('Redis connected successfully')

    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`)
      logger.info(`API available at http://localhost:${PORT}/api/v1`)
    })

    const gracefulShutdown = async (signal: string) => {
      logger.info(`${signal} received. Starting graceful shutdown...`)
      server.close(async () => {
        logger.info('HTTP server closed')
        process.exit(0)
      })

      setTimeout(() => {
        logger.error('Forced shutdown after timeout')
        process.exit(1)
      }, 10000)
    }

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
    process.on('SIGINT', () => gracefulShutdown('SIGINT'))
  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()