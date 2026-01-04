import { DataSource } from 'typeorm';
import { JokeEntity } from '../entities/joke.entity';
import { AuthorEntity } from '../entities/author.entity';
import { ThemeEntity } from '../entities/theme.entity';

export const PostgresConfig = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'jokes_db',
  synchronize: false, 
  logging: true,
  entities: [JokeEntity, AuthorEntity, ThemeEntity],
  subscribers: [],
  migrations: [],
});