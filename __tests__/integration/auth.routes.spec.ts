import request from 'supertest';
import app from '../../src/app';

describe('Auth Module Integration', () => {
  it('POST /api/auth/login - debería devolver un JWT si las credenciales son válidas', async () => {
    const credentials = {
      username: 'admin',
      password: 'password123'
    };

    const res = await request(app).post('/api/auth/login').send(credentials);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  it('POST /api/auth/login - debería devolver 401 si la contraseña es incorrecta', async () => {
    const badCredentials = {
      username: 'admin',
      password: 'wrongpassword'
    };

    const res = await request(app).post('/api/auth/login').send(badCredentials);

    expect(res.status).toBe(401);
  });
});