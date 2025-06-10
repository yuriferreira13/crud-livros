import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.bookRepository.save(book);
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findById(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) throw new NotFoundException(`Livro com ID ${id} não encontrado`);
    return book;
  }

  async updateReadStatus(id: number, isRead: boolean) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) throw new NotFoundException(`Livro com ID ${id} não encontrado`);

    book.isRead = isRead;
    return await this.bookRepository.save(book);
  }

  async deleteBook(id: number) {
    const result = await this.bookRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Livro com ID ${id} não encontrado`);
    return { message: `Livro com ID ${id} deletado com sucesso` };
  }
}
