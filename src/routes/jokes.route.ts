import { Router } from 'express';

import { JokesController } from '../controllers/jokes.controller';
import { JokesService } from '../services/jokes.service';
import { JokesRepository } from '../repositories/jokes.repository';
import { validateDto } from '../middleware/validation.middleware';
import { PostgresConfig } from '../configs/postgres.config';
import { CreateJokeDto } from '../dtos/create-joke.dto';
import { UpdateJokeDto } from '../dtos/update-joke.dto';

const router = Router();

const jokeRepository = new JokesRepository(PostgresConfig);
const jokeService = new JokesService(jokeRepository);
const jokeController = new JokesController(jokeService);

router.post('/', validateDto(CreateJokeDto), jokeController.create);
router.get('/', jokeController.findAll);
router.get('/emparejados', jokeController.findJokesPaired);
router.get('/source/:source', jokeController.findJokeBySource);
router.put('/:id', validateDto(UpdateJokeDto), jokeController.update);
router.delete('/:id', jokeController.delete);

export default router;