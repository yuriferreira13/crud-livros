import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'Título do livro',
    example: 'O Senhor dos Anéis',
  })
  title: string;

  @ApiProperty({ description: 'Autor do livro', example: 'J.R.R. Tolkien' })
  author: string;

  @ApiProperty({ description: 'Ano de publicação', example: 1954 })
  publishedYear: number;

  @ApiProperty({ description: 'Indica se o livro foi lido', example: false })
  isRead: boolean;
}
