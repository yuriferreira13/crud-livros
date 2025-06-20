import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID do livro', example: 1 })
  id: number;

  @Column()
  @ApiProperty({
    description: 'Título do livro',
    example: 'O Senhor dos Anéis',
  })
  title: string;

  @Column()
  @ApiProperty({ description: 'Autor do livro', example: 'J.R.R. Tolkien' })
  author: string;

  @Column()
  @ApiProperty({ description: 'Ano de publicação', example: 1954 })
  publishedYear: number;

  @Column({ default: false })
  @ApiProperty({ description: 'Indica se o livro foi lido', example: true })
  isRead: boolean;
}
