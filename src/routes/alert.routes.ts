import { Router } from 'express';
import { AlertController } from '../controllers/alert.controller';

const router = Router();
const controller = new AlertController();

router.post('/', controller.send);

export default router;