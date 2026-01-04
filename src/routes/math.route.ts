import { Router } from 'express';
import { MathController } from '../controllers/math.controller';
import { MathService } from '../services/math.service';

const router = Router();

const mathService = new MathService();
const mathController = new MathController(mathService);

router.get('/lcm', mathController.getLcm);
router.get('/plus-one', mathController.getPlusOne);

export default router;