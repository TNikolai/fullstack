import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-frontend-domain.com']
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  const storageType = process.env.USE_FILE_STORAGE === 'true' ? 'file' : 'mongodb';
  res.status(200).json({
    status: 'OK',
    message: `Todo API is running with ${storageType} storage`,
    timestamp: new Date().toISOString(),
    storage: storageType
  });
});

// Database status endpoint
app.get('/db-status', (req, res) => {
  const storageType = process.env.USE_FILE_STORAGE === 'true' ? 'File-based' : 'MongoDB';
  res.status(200).json({
    storage: storageType,
    status: 'Connected',
    message: `Todos are stored using ${storageType} storage`
  });
});

// API routes
app.use('/api/todos', todoRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// Start server
const startServer = async () => {
  try {
    console.log('🔍 Environment check:');
    console.log('  USE_FILE_STORAGE:', process.env.USE_FILE_STORAGE);
    console.log('  Should use file storage:', process.env.USE_FILE_STORAGE === 'true');

    // Only connect to MongoDB if not using file storage
    if (process.env.USE_FILE_STORAGE !== 'true') {
      console.log('🔄 Attempting to connect to MongoDB...');
      // Dynamic import to avoid errors when mongoose isn't available
      const { connectDatabase } = await import('./config/database.js');
      await connectDatabase();
    } else {
      console.log('📁 Using file-based storage');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 API base URL: http://localhost:${PORT}/api`);
      const storageType = process.env.USE_FILE_STORAGE === 'true' ? 'File-based' : 'MongoDB (Docker)';
      console.log(`🗄️  Storage: ${storageType}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    console.log('💡 Falling back to file storage...');

    // Set file storage and try again
    process.env.USE_FILE_STORAGE = 'true';

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT} (file storage mode)`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 API base URL: http://localhost:${PORT}/api`);
      console.log(`📁 Storage: File-based (fallback)`);
    });
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully');
  process.exit(0);
});

startServer();
