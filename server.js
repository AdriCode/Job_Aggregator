import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import jobRoutes from './routes/jobs.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import './cron/scheduler.js';

const app = express();
app.use(cors());
app.use(json());

app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
