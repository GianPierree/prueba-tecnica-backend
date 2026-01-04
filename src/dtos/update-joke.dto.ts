import {
  IsString,
  IsNotEmpty,
  Length,
} from 'class-validator';


export class UpdateJokeDto {
  @IsString()
  @IsNotEmpty({ message: 'El contenido no puede estar vacío' })
  @Length(10, 500, { message: 'El chiste debe tener entre 10 y 500 caracteres' })
  content!: string;
}