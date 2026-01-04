import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/auth.dto';

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    try {
      const credentials = req.body as LoginDto;
      const result = await this.authService.login(credentials);

      res.status(200).json({
        success: true,
        message: 'Autenticación exitosa',
        token: result.token
      });
    } catch (error: any) {
      res.status(401).json({
        error: error.message
      });
    }
  };
}