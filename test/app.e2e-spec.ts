import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Books API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/books (POST) deve criar um livro', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({
        title: 'Duna',
        author: 'Frank Herbert',
        publishedYear: 1965,
        isRead: false,
      })
      .expect(201);
  });

  it('/books (GET) deve retornar lista de livros', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
      });
  });
});
