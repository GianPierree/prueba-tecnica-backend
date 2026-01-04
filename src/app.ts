import express from 'express';
import jokesRoute from './routes/jokes.route';
import mathRoute from './routes/math.route';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Service is running' });
});

app.use('/api/jokes', jokesRoute)
app.use('/api/math', mathRoute);

export default app;