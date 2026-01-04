import { Repository, DataSource } from 'typeorm';

import { Joke } from '../interfaces/jokes.interface';
import { JokeEntity } from '../entities/joke.entity';
import { AuthorEntity } from '../entities/author.entity';
import { ThemeEntity } from '../entities/theme.entity';

export class JokesRepository {
  private repository: Repository<JokeEntity>;
  private authorRepository: Repository<AuthorEntity>;
  private themeRepository: Repository<ThemeEntity>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(JokeEntity);
    this.authorRepository = dataSource.getRepository(AuthorEntity);
    this.themeRepository = dataSource.getRepository(ThemeEntity);
  }
  
  async create(jokeData: Joke): Promise<string> {
    const author = await this.authorRepository.findOneBy({ id: jokeData.author_id });
    if (!author) {
      throw new Error(`El autor con ID ${jokeData.author_id} no existe.`);
    }

    const theme = await this.themeRepository.findOneBy({ id: jokeData.theme_id });
    if (!theme) {
      throw new Error(`El tema con ID ${jokeData.theme_id} no existe.`);
    }

    const newJoke = this.repository.create({
      id: jokeData.id,
      content: jokeData.content,
      author: author,
      theme: theme
    });

    const result = await this.repository.save(newJoke);
    return result.id;
  }

  async findAllJokes(): Promise<JokeEntity[]> {
    return await this.repository.find({
      relations: ['author', 'theme'],
      order: { createdAt: 'DESC' }
    });
  }

  async update(id: string, content: string): Promise<boolean> {
    const joke = await this.repository.findOneBy({ id });
    if (!joke) {
      throw new Error(`El chiste con ID ${id} no existe.`);
    }

    const result = await this.repository.update({ id }, { content });
    return Boolean(result.affected);
  }

  async delete(id: string): Promise<boolean> {
    const joke = await this.repository.findOneBy({ id });
    if (!joke) {
      throw new Error(`El chiste con ID ${id} no existe.`);
    }
    
    const result = await this.repository.delete({ id });
    return Boolean(result.affected);
  }
}