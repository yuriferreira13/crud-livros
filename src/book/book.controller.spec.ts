import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            createBook: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            updateBook: jest.fn(),
            updateReadStatus: jest.fn(),
            deleteBook: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('deve criar um livro', async () => {
    const bookDto: CreateBookDto = {
      title: 'Duna',
      author: 'Frank Herbert',
      publishedYear: 1965,
      isRead: false,
    };
    const createdBook = { id: 1, ...bookDto };

    jest.spyOn(service, 'createBook').mockResolvedValue(createdBook);

    expect(await controller.createBook(bookDto)).toEqual(createdBook);
  });

  it('deve atualizar um livro existente', async () => {
    const updates: UpdateBookDto = { isRead: true };
    const updatedBook = {
      id: 1,
      title: 'Duna',
      author: 'Frank Herbert',
      publishedYear: 1965,
      isRead: true,
    };

    jest.spyOn(service, 'updateBook').mockResolvedValue(updatedBook);

    expect(await controller.updateBook(1, updates)).toEqual(updatedBook);
  });

  it('deve listar todos os livros', async () => {
    const books = [
      {
        id: 1,
        title: 'Duna',
        author: 'Frank Herbert',
        publishedYear: 1965,
        isRead: false,
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(books);

    expect(await controller.findAll()).toEqual(books);
  });

  it('deve buscar um livro pelo ID', async () => {
    const book = {
      id: 1,
      title: 'Duna',
      author: 'Frank Herbert',
      publishedYear: 1965,
      isRead: false,
    };
    jest.spyOn(service, 'findById').mockResolvedValue(book);

    expect(await controller.findById(1)).toEqual(book);
  });

  it('deve atualizar o status de leitura', async () => {
    const updatedBook = {
      id: 1,
      title: 'Duna',
      author: 'Frank Herbert',
      publishedYear: 1965,
      isRead: true,
    };
    jest.spyOn(service, 'updateReadStatus').mockResolvedValue(updatedBook);

    expect(await controller.updateReadStatus(1, { isRead: true })).toEqual(
      updatedBook,
    );
  });

  it('deve excluir um livro', async () => {
    jest
      .spyOn(service, 'deleteBook')
      .mockResolvedValue({ message: 'Livro excluído com sucesso' });

    expect(await controller.deleteBook(1)).toEqual({
      message: 'Livro excluído com sucesso',
    });
  });
});
