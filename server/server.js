import express from 'express';
import cors from 'cors';
import { env } from './src/config/env.js';
import { logger } from './src/config/logger.js';
import { errorHandler } from './src/middleware/errorMiddleware.js';
import routes from './src/routes/index.js';

const app = express();

// Global Middlewares
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// API Routes
app.use('/api', routes);

// Global Error Handler
app.use(errorHandler);

const startServer = () => {
  try {
    app.listen(env.PORT, () => {
      logger.info(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
