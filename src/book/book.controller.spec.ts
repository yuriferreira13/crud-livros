import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';

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
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('deve criar um livro', async () => {
    const book = {
      id: 1,
      title: 'Duna',
      author: 'Frank Herbert',
      publishedYear: 1965,
      isRead: false,
    };
    jest.spyOn(service, 'createBook').mockResolvedValue(book);

    expect(await controller.createBook(book)).toEqual(book);
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
});
