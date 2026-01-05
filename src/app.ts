import express from 'express';
import jokesRoute from './routes/jokes.route';
import mathRoute from './routes/math.route';
import authRoute from './routes/auth.routes';
import alertRoutes from './routes/alert.routes';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Service is running' });
});

app.use('/api/jokes', jokesRoute)
app.use('/api/math', mathRoute);
app.use('/api/auth', authRoute);
app.use('/api/alert', alertRoutes);

export default app;