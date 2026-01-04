import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { AuthorEntity } from './author.entity';
import { ThemeEntity } from './theme.entity';

@Entity('jokes')
export class JokeEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('text')
  content!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'author_id' }) 
  authorId!: number;

  @Column({ name: 'theme_id' }) 
  themeId!: number;
  
  @ManyToOne(() => AuthorEntity)
  @JoinColumn({ name: 'author_id' })
  author!: AuthorEntity;

  @ManyToOne(() => ThemeEntity)
  @JoinColumn({ name: 'theme_id' })
  theme!: ThemeEntity;
}