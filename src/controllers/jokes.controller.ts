import { Request, Response } from 'express';
import { JokesService } from '../services/jokes.service';
import { CreateJokeDto } from '../dtos/create-joke.dto';
import { UpdateJokeDto } from '../dtos/update-joke.dto';

export class JokesController {
  constructor(private jokesService: JokesService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: CreateJokeDto = req.body;
      const jokeId = await this.jokesService.createJoke(data);
      res.status(201).json({
        success: true,
        message: 'Chiste creado exitosamente',
        joke: { id: jokeId }
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  findAll = async (_req: Request, res: Response): Promise<void> => {
    const jokes = await this.jokesService.findAllJokes();
    res.json({
      success: true,
      message: 'Chistes obtenidos exitosamente',
      jokes
    });
  }
  
  findJokeBySource = async (req: Request, res: Response): Promise<void> => {
    const { source } = req.params;
    try {
      const joke = await this.jokesService.findJokeBySource(source);
      res.json({
        success: true,
        message: 'Chiste obtenido exitosamente',
        joke
      });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
  
  update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { content } = req.body as UpdateJokeDto;
    try {
      const updated = await this.jokesService.updateJoke(id, content);
      if (updated) {
        res.json({
          success: true,
          message: 'Chiste actualizado exitosamente'
        });
      } else {
        res.status(404).json({ error: 'Chiste no encontrado para actualizar' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deleted = await this.jokesService.deleteJoke(id);
      if (deleted) {
        res.json({
          success: true,
          message: 'Chiste eliminado exitosamente'
        });
      } else {
        res.status(404).json({ error: 'Chiste no encontrado para eliminar' });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  findJokesPaired = async (_req: Request, res: Response) => {
    try {
      const result = await this.jokesService.findJokesPaired();
      
      res.status(200).json({
        success: true,
        count: result.length,
        data: result
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}