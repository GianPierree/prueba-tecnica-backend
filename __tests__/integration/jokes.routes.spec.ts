import request from 'supertest';
import app from '../../src/app';
import { PostgresConfig } from '../../src/configs/postgres.config';
import { JokeProviderFactory } from '../../src/providers/joke.factory';

describe('Jokes API Integration', () => {
  
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
  
  it('GET /api/jokes/emparejados - debería devolver 5 chistes emparejados', async () => {
    const mockProvider = {
      getJoke: jest.fn().mockResolvedValue('Chiste Mock')
    };

    jest.spyOn(JokeProviderFactory, 'getProvider').mockReturnValue(mockProvider as any);

    const res = await request(app).get('/api/jokes/emparejados');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(5); 
    
    const primerPar = res.body.data[0];
    expect(primerPar).toHaveProperty('chuck');
    expect(primerPar).toHaveProperty('dad');
    expect(primerPar).toHaveProperty('combined');
    
    expect(primerPar.combined).toContain('but ironically');
  });
});