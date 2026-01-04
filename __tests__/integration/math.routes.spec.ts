import request from 'supertest';
import app from '../../src/app';

describe('Math Routes Integration', () => {
  describe('GET /api/math/lcm', () => {
    
    it('debería devolver el MCM de dos números (4, 6 -> 12)', async () => {
      const response = await request(app).get('/api/math/lcm?numbers=4,6');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBe(12);
    });

    it('debería calcular el MCM de una lista de varios números (2,3,4,5 -> 60)', async () => {
      const response = await request(app).get('/api/math/lcm?numbers=2,3,4,5');
      
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(60);
    });

    it('debería devolver 400 Bad Request si no se envía el query param "numbers"', async () => {
      const response = await request(app).get('/api/math/lcm');
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('debería devolver 400 Bad Request si se envían valores no numéricos', async () => {
      const response = await request(app).get('/api/math/lcm?numbers=1,2,perro');
      
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('no es un número válido');
    });
  });

  describe('GET /api/math/plus-one', () => {

    it('debería devolver el número incrementado en 1 (5 -> 6)', async () => {
      const response = await request(app).get('/api/math/plus-one?number=5');
      
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(6)
    });

    it('debería manejar números negativos correctamente (-5 -> -4)', async () => {
      const response = await request(app).get('/api/math/plus-one?number=-5');
      
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(-4);
    });

    it('debería devolver 400 si falta el parámetro "number"', async () => {
      const response = await request(app).get('/api/math/plus-one');
      
      expect(response.status).toBe(400);
    });

    it('debería devolver 400 si el parámetro no es un número válido', async () => {
      const response = await request(app).get('/api/math/plus-one?number=hola');
      
      expect(response.status).toBe(400);
    });
  });
});