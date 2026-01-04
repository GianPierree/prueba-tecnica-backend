import { JokesRepository } from '../repositories/jokes.repository';
import { Joke } from '../interfaces/jokes.interface';
import { v4 as uuidv4 } from 'uuid';
import { JokeProviderFactory } from '../providers/joke.factory';
import { CreateJokeDto } from '../dtos/create-joke.dto';


export class JokesService {
  constructor(
    private readonly jokesRepository: JokesRepository,
  ) {}

  async findAllJokes() {
    return await this.jokesRepository.findAllJokes();
  }

  async createJoke(jokes: CreateJokeDto) {
    if (jokes.content.length < 5) {
      throw new Error('El chiste es muy corto');
    }

    const newJoke: Joke = {
      id: uuidv4(),
      content: jokes.content,
      theme_id: jokes.theme_id,
      author_id: jokes.author_id,
      created_at: new Date(),
      updated_at: new Date()
    };

    const jokeId = await this.jokesRepository.create(newJoke);

    return jokeId;
  }

  async findJokeBySource(source: string) {
    const provider = JokeProviderFactory.getProvider(source);
    const jokeContent = await provider.getJoke();

    return {
      source,
      jokes: jokeContent
    };
  }

  
  async updateJoke(id: string, content: string): Promise<boolean> {
    return await this.jokesRepository.update(id, content);
  }

  async deleteJoke(id: string): Promise<boolean> {
    return await this.jokesRepository.delete(id);
  }
}