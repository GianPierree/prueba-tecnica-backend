import request from 'supertest';
import app from '../../src/app';
import { PostgresConfig } from '../../src/configs/postgres.config';

describe('Jokes API (Integration)', () => {
  
  beforeAll(async () => {
    if (!PostgresConfig.isInitialized) await PostgresConfig.initialize();
  });

  it('POST /api/jokes - debería guardar un chiste en la DB', async () => {
    const newJoke = {
      content: 'Chiste de integración test',
      author_id: 1, 
      theme_id: 1   
    };

    const res = await request(app).post('/api/jokes').send(newJoke);

    expect(res.status).toBe(201);
    expect(res.body.joke).toHaveProperty('id');
  });

  it('GET /api/jokes/source/Dad - debería traer chiste externo', async () => {
    const res = await request(app).get('/api/jokes/source/Dad');
    expect(res.status).toBe(200);
    expect(res.body.joke.source).toBe('Dad');
    expect(typeof res.body.joke.jokes).toBe('string');
  });
});