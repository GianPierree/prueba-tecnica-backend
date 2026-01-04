import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { JokeEntity } from './joke.entity';

@Entity('authors')
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => JokeEntity, (joke) => joke.author)
  jokes!: JokeEntity[];
}