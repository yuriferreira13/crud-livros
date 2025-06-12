import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

interface BookResponse {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
  isRead: boolean;
}

describe('Books API (e2e)', () => {
  let app: INestApplication;
  let createdBookId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/books (POST) deve criar um livro', async () => {
    const response = await request(app.getHttpServer())
      .post('/books')
      .send({
        title: 'Duna',
        author: 'Frank Herbert',
        publishedYear: 1965,
        isRead: false,
      })
      .expect(201);

    const responseBody = response.body as BookResponse; // 🔥 Tipagem explícita
    createdBookId = responseBody.id;

    expect(responseBody.title).toBe('Duna');
  });

  it('/books (POST) deve retornar erro ao enviar dados inválidos', async () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({ title: '', publishedYear: 'string' }) // 🔥 Campos inválidos
      .expect(400);
  });

  it('/books (GET) deve retornar lista de livros', async () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(({ body }: { body: BookResponse[] }) => {
        expect(Array.isArray(body)).toBe(true);
      });
  });

  it('/books/:id (GET) deve retornar um livro específico', async () => {
    return request(app.getHttpServer())
      .get(`/books/${createdBookId}`)
      .expect(200)
      .expect(({ body }: { body: BookResponse }) => {
        expect(body.id).toBe(createdBookId);
      });
  });

  it('/books/:id (GET) deve retornar erro ao buscar livro inexistente', async () => {
    return request(app.getHttpServer())
      .get('/books/99999') // 🔥 ID inválido
      .expect(404);
  });

  it('/books/:id (PATCH) deve atualizar um livro', async () => {
    return request(app.getHttpServer())
      .patch(`/books/${createdBookId}`)
      .send({ isRead: true })
      .expect(200)
      .expect(({ body }: { body: BookResponse }) => {
        expect(body.isRead).toBe(true);
      });
  });

  it('/books/:id (PATCH) deve retornar erro ao atualizar livro inexistente', async () => {
    return request(app.getHttpServer())
      .patch('/books/99999')
      .send({ isRead: true })
      .expect(404);
  });

  it('/books/:id/read-status (PATCH) deve atualizar status de leitura', async () => {
    return request(app.getHttpServer())
      .patch(`/books/${createdBookId}/read-status`)
      .send({ isRead: false })
      .expect(200)
      .expect(({ body }: { body: BookResponse }) => {
        expect(body.isRead).toBe(false);
      });
  });

  it('/books/:id (DELETE) deve excluir um livro', async () => {
    return request(app.getHttpServer())
      .delete(`/books/${createdBookId}`)
      .expect(200)
      .expect(({ body }: { body: { message: string } }) => {
        expect(body.message).toBe(
          `Livro com ID ${createdBookId} deletado com sucesso`,
        );
      });
  });

  it('/books/:id (DELETE) deve retornar erro ao excluir livro inexistente', async () => {
    return request(app.getHttpServer()).delete('/books/99999').expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
