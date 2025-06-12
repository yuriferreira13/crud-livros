import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Livros')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBody({ type: CreateBookDto })
  async createBook(
    @Body()
    body: CreateBookDto,
  ) {
    try {
      return await this.bookService.createBook(
        body.title,
        body.author,
        body.publishedYear,
        body.isRead,
      );
    } catch (error) {
      throw new NotFoundException('Erro ao criar livro');
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBody({ type: UpdateBookDto })
  async updateBook(
    @Param('id') id: number,
    @Body() updatedFields: UpdateBookDto,
  ) {
    try {
      return await this.bookService.updateBook(id, updatedFields);
    } catch (error) {
      throw new NotFoundException('Erro ao atualizar livro');
    }
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
    @Body() body: { isRead: boolean },
  ) {
    return await this.bookService.updateReadStatus(id, body.isRead);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number) {
    return await this.bookService.deleteBook(id);
  }
}
