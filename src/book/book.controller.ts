import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/book.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Livros')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiBody({ type: CreateBookDto })
  async createBook(
    @Body()
    body: {
      title: string;
      author: string;
      publishedYear: number;
      isRead: boolean;
    },
  ) {
    return await this.bookService.createBook(
      body.title,
      body.author,
      body.publishedYear,
      body.isRead,
    );
  }

  @Get()
  async findAll() {
    return await this.bookService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.bookService.findById(id);
  }

  @Patch(':id/read-status')
  @ApiBody({ schema: { example: { isRead: true } } })
  async updateReadStatus(
    @Param('id') id: number,
    @Body() body: { isRead: boolean }) {
    return await this.bookService.updateReadStatus(id, body.isRead);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number) {
    return await this.bookService.deleteBook(id);
  }
}
