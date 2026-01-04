import { JokesRepository } from '../repositories/jokes.repository';
import { Joke } from '../interfaces/jokes.interface';
import { v4 as uuidv4 } from 'uuid';
import { JokeProviderFactory } from '../providers/joke.factory';
import { CreateJokeDto } from '../dtos/create-joke.dto';
import { JokePaired } from '../interfaces/joke-paired.interface';


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

  async findJokesPaired(): Promise<JokePaired[]> {
    const chuckProvider = JokeProviderFactory.getProvider('chuck');
    const dadProvider = JokeProviderFactory.getProvider('dad');

    try {
      const chuckPromises = Array.from({ length: 5 }, () => chuckProvider.getJoke());
      const dadPromises = Array.from({ length: 5 }, () => dadProvider.getJoke());

      const [chuckResults, dadResults] = await Promise.all([
        Promise.all(chuckPromises), 
        Promise.all(dadPromises)
      ]);

      const pairedJokes: JokePaired[] = chuckResults.map((chuckJoke, index) => {
        const dadJoke = dadResults[index];
        
        return {
          chuck: chuckJoke,
          dad: dadJoke,
          combined: this.combineJokes(chuckJoke, dadJoke)
        };
      });

      return pairedJokes;

    } catch (error: any) {
      throw new Error('Error de comunicación con las APIs externas de chistes');
    }
  }

  private combineJokes(chuck: string, dad: string): string {
    const cleanChuck = chuck.replace(/\.$/, '');
    return `${cleanChuck}, but ironically, ${dad.toLowerCase()}`;
  }
}