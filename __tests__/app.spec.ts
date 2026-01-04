import request from 'supertest';
import app from '../src/app';

describe('GET /healt', () => {
  it('debería retornar un mensaje de saludo', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Service is running');
  });
});