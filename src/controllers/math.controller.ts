import { Request, Response } from 'express';
import { MathService } from '../services/math.service';

export class MathController {
  constructor(private mathService: MathService) {}

  getLcm = (req: Request, res: Response) => {
    try {
      const { numbers } = req.query;

      if (!numbers || typeof numbers !== 'string') {
        return res.status(400).json({ error: 'Debes enviar el param "numbers" separado por comas (ej: 4,6,8)' });
      }

      const result = this.mathService.calculateLcm(numbers);
      res.status(200).json({ 
        success: true,
        message: 'Cálculo realizado correctamente',
        result 
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getPlusOne = (req: Request, res: Response) => {
    try {
      const { number } = req.query;

      if (!number || typeof number !== 'string') {
        return res.status(400).json({ error: 'Debes enviar el param "number"' });
      }

      const parsedNumber = parseInt(number, 10);

      if (isNaN(parsedNumber)) {
        return res.status(400).json({ error: 'El parámetro debe ser un número entero' });
      }

      const result = this.mathService.addOne(parsedNumber);
      res.status(200).json({ 
        success: true,
        message: 'Cálculo realizado correctamente',
        result 
      });

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}