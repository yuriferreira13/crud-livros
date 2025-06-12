import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

describe('BookService', () => {
  let service: BookService;
  let repository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('deve criar um livro', async () => {
    const book = {
      id: 1,
      title: 'Duna',
      author: 'Frank Herbert',
      publishedYear: 1965,
      isRead: false,
    };
    jest.spyOn(repository, 'create').mockReturnValue(book);
    jest.spyOn(repository, 'save').mockResolvedValue(book);

    expect(
      await service.createBook(
        book.title,
        book.author,
        book.publishedYear,
        book.isRead,
      ),
    ).toEqual(book);
  });

  it('deve retornar erro ao buscar um livro inexistente', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    await expect(service.findById(999)).rejects.toThrow(
      'Livro com ID 999 não encontrado',
    );
  });
});

describe('BookService - updateBook()', () => {
  let service: BookService;
  let repository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('deve atualizar os campos de um livro existente', async () => {
    const book: Book = {
      id: 1,
      title: 'Original',
      author: 'Autor',
      publishedYear: 2020,
      isRead: false,
    };
    const updates = { isRead: true };

    jest.spyOn(repository, 'findOne').mockResolvedValue(book);
    jest.spyOn(repository, 'save').mockResolvedValue({ ...book, ...updates });

    const result = await service.updateBook(1, updates);

    expect(result.isRead).toBe(true);
    expect(jest.spyOn(repository, 'findOne')).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(jest.spyOn(repository, 'save')).toHaveBeenCalledWith({
      ...book,
      ...updates,
    });
  });

  it('deve retornar erro ao tentar atualizar um livro inexistente', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(
      service.updateBook(999, { title: 'Novo título' }),
    ).rejects.toThrow('Livro não encontrado');
    expect(jest.spyOn(repository, 'findOne')).toHaveBeenCalledWith({
      where: { id: 999 },
    });
  });
});
