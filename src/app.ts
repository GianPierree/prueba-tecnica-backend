import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import jokesRoute from './routes/jokes.route';
import mathRoute from './routes/math.route';
import authRoute from './routes/auth.routes';
import alertRoutes from './routes/alert.routes';

const app = express();
app.use(express.json());

const swaggerPath = path.join(__dirname, '../docs/swagger.yml');
const swaggerDocument = YAML.load(swaggerPath);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Service is running' });
});

app.use('/api/jokes', jokesRoute)
app.use('/api/math', mathRoute);
app.use('/api/auth', authRoute);
app.use('/api/alert', alertRoutes);

export default app;