import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { validateDto } from '../middlewares/validation.middleware';
import { LoginDto } from '../dtos/auth.dto';
import { authorizeRole, verifyToken } from '../middlewares/jwt.middleware';

const router = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.post('/login', validateDto(LoginDto), authController.login);
router.get('/usuario', verifyToken, authorizeRole(['user', 'admin']), authController.getProfile);
router.get('/admin', verifyToken, authorizeRole(['admin']), authController.getAdminDashboard);
router.get('/external/callback', authController.handleExternalCallback);

export default router;