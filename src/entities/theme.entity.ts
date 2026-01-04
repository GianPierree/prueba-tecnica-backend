import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { JokeEntity } from './joke.entity';

@Entity('themes')
export class ThemeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => JokeEntity, (joke) => joke.theme)
  jokes!: JokeEntity[];
}