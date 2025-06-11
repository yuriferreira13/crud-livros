/* eslint-disable @typescript-eslint/no-unsafe-call */

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsBoolean, Min, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'Título do livro',
    example: 'O Senhor dos Anéis',
  })
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  title: string;

  @ApiProperty({ description: 'Autor do livro', example: 'J.R.R. Tolkien' })
  @IsString()
  @IsNotEmpty({ message: 'O autor é obrigatório' })
  author: string;

  @ApiProperty({ description: 'Ano de publicação', example: 1954 })
  @IsInt()
  @Min(1000, { message: 'O ano de publicação deve ser maior que 1000' })
  @IsNotEmpty({ message: 'O ano de publicação é obrigatório' })
  publishedYear: number;

  @ApiProperty({ description: 'Indica se o livro foi lido', example: false })
  @IsBoolean()
  @IsNotEmpty({ message: 'O status de leitura é obrigatório' })
  isRead: boolean;
}
