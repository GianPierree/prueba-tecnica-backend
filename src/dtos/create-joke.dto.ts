import {
  IsString,
  IsNotEmpty,
  Length,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateJokeDto {
  @IsString()
  @IsNotEmpty({ message: 'El contenido no puede estar vacío' })
  @Length(10, 500, { message: 'El chiste debe tener entre 10 y 500 caracteres' })
  content!: string;

  @IsInt({ message: 'El author_id debe ser un número entero' })
  @IsPositive()
  author_id!: number;

  @IsInt({ message: 'El theme_id debe ser un número entero' })
  @IsPositive()
  theme_id!: number;
}