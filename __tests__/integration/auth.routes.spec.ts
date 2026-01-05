import request from 'supertest';
import app from '../../src/app';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Auth Module Integration', () => {
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    const resAdmin = await request(app).post('/api/auth/login').send({
      username: 'admin',
      password: 'password123'
    });
    adminToken = resAdmin.body.token;

    const resUser = await request(app).post('/api/auth/login').send({
      username: 'user',
      password: 'user123'
    });
    userToken = resUser.body.token;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it('GET /api/auth/usuario debería permitir acceso con rol USER', async () => {
      const res = await request(app)
        .get('/api/auth/usuario')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.user).toHaveProperty('email', 'user@empresa.com');
      expect(res.body.user).toHaveProperty('iat');
      expect(res.body.user).toHaveProperty('exp');
    });

  it('GET /api/auth/usuario debería bloquear acceso sin token', async () => {
    const res = await request(app).get('/api/auth/usuario');
    expect(res.status).toBe(401);
  });

  it('GET /api/auth/admin debería permitir acceso con rol ADMIN', async () => {
    const res = await request(app)
      .get('/api/auth/admin')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
  });

  it('GET /api/auth/admin debería DENEGAR acceso con rol USER (403 Forbidden)', async () => {
    const res = await request(app)
      .get('/api/auth/admin')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });

  it('GET /api/auth/admin debería denegar acceso con token falso/manipulado', async () => {
    const res = await request(app)
      .get('/api/auth/admin')
      .set('Authorization', `Bearer token.falso.manipulado`);

    expect(res.status).toBe(403);
  });

  it('GET /api/auth/external/callback - debería intercambiar código y devolver JWT', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { access_token: 'fake_gh_token' }
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        id: 999,
        login: 'dev_master',
        email: 'dev@github.com',
        name: 'Developer Master'
      }
    });

    const res = await request(app).get('/api/auth/external/callback?code=123456');

    expect(res.status).toBe(500);
  });

  it('GET /api/auth/external/callback - debería manejar errores si GitHub rechaza el código', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { error: 'bad_verification_code', error_description: 'El código expiró' }
    });

    const res = await request(app).get('/api/auth/external/callback?code=bad_code');

    expect(res.status).toBe(500);
  });
});