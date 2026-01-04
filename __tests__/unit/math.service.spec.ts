import { MathService } from '../../src/services/math.service';

describe('Math Service Unit', () => {
  let service: MathService;

  beforeEach(() => {
    service = new MathService();
  });

  describe('calculateLcm', () => {
    it('debe calcular el MCM de dos números correctamente', () => {
      expect(service.calculateLcm('4, 6')).toBe(12);
    });

    it('debe calcular el MCM de múltiples números', () => {
      expect(service.calculateLcm('2, 3, 4, 5')).toBe(60);
    });

    it('debe devolver 0 si el string está vacío', () => {
      expect(service.calculateLcm('')).toBe(0);
    });
    
    it('debe lanzar error si recibe caracteres no numéricos', () => {
      expect(() => service.calculateLcm('1, A, 3')).toThrow();
    });
  });

  describe('addOne', () => {
    it('debe sumar 1 al número dado', () => {
      expect(service.addOne(99)).toBe(100);
    });
  });
});