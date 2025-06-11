import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async createBook(
    title: string,
    author: string,
    publishedYear: number,
    isRead: boolean,
  ) {
    const book = this.bookRepository.create({
      title,
      author,
      publishedYear,
      isRead,
    });
    //console.log('Dados antes de salvar:', { title, author, publishedYear, isRead }); // Debug
    return await this.bookRepository.save(book);
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findById(id: number) {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('ID inválido');
    }

    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) throw new NotFoundException(`Livro com ID ${id} não encontrado`);
    return book;
  }

  async updateReadStatus(id: number, isRead: boolean) {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('ID inválido');
    }
    if (typeof isRead !== 'boolean') {
      throw new BadRequestException(
        'O valor de "isRead" deve ser um booleano (true ou false)',
      );
    }

    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) throw new NotFoundException(`Livro com ID ${id} não encontrado`);

    book.isRead = isRead;
    return await this.bookRepository.save(book);
  }

  async deleteBook(id: number) {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('ID inválido');
    }

    const result = await this.bookRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Livro com ID ${id} não encontrado`);
    return { message: `Livro com ID ${id} deletado com sucesso` };
  }
}
