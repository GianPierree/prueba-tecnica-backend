import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/auth.dto';
import { AuthRequest } from '../middlewares/jwt.middleware';

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

  getProfile = (req: AuthRequest, res: Response) => {
    res.status(200).json({
      message: 'Bienvenido al perfil de Usuario',
      user: req.user
    });
  };

  getAdminDashboard = (req: AuthRequest, res: Response) => {
    res.status(200).json({
      message: 'Bienvenido al Dashboard de Administrador',
      user: req.user
    });
  };

  handleExternalCallback = async (req: Request, res: Response) => {
    try {
      const { code } = req.query;
      const provider = 'github'; 

      if (!code || typeof code !== 'string') {
        return res.status(400).json({ error: 'Falta el código de autorización' });
      }

      const result = await this.authService.loginExternal(provider, code);

      res.status(200).json({
        success: true,
        message: `Login con ${provider} exitoso`,
        token: result.token,
        user: result.user
      });

    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
};
}