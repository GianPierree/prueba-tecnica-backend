import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { validateDto } from '../middlewares/validation.middleware';
import { LoginDto } from '../dtos/auth.dto';

const router = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.post('/login', validateDto(LoginDto), authController.login);

export default router;