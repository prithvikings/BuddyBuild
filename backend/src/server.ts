import app from './app';
import { config } from './config/env';
import { db } from './config/database';
import { redis } from './config/redis';
import './queues/review.worker'; // Side-effect import to start the worker

const startServer = async () => {
  try {
    // 1. Verify Infrastructure Connectivity
    await db.query('SELECT 1'); 
    console.log('[Init] Database connected');
    
    // 2. Start HTTP Server
    const server = app.listen(config.PORT, () => {
      console.log(`[Server] Running on port ${config.PORT} in ${config.NODE_ENV} mode`);
    });

    // 3. Graceful Shutdown Logic
    const shutdown = async (signal: string) => {
      console.log(`[${signal}] Shutting down...`);
      
      server.close(() => {
        console.log('[Server] HTTP server closed');
      });

      // Close external connections
      await db.close();
      await redis.quit();
      
      console.log('[Infra] Connections closed. Exiting.');
      process.exit(0);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('[Fatal] Failed to start server:', error);
    process.exit(1);
  }
};

startServer();