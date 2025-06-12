
## Descrição

 Aplicação simples de cadastro de livros

![image](https://github.com/user-attachments/assets/49e1b040-01f6-44ee-97ef-5cc116d2a7b7)

🔹 Pontos importantes:
- Módulo book/: Contém toda a lógica relacionada à gestão de livros.
- book.dto.ts: Define as regras de validação dos dados.
- book.service.ts: Implementa regras de negócio como criação, atualização e remoção de livros.
- book.controller.ts: Define os endpoints da API (GET, POST, PATCH, DELETE).
- app.module.ts: Módulo central que agrupa todos os outros módulos e configurações.
- test/: Contém testes de integração (e2e) para garantir o funcionamento da API.
- main.ts: Arquivo principal onde o NestJS inicializa a aplicação.


## Instalação do projeto

```bash
$ npm install
```

## Compilar e rodar o projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Endpoints

```bash
# Você pode testar as rotas com o swagger em:
http://localhost:3000/api

# Cliente HTTP, como Postman, Insomnia
$ POST http://localhost:3000/books
{
  "title": "O Senhor dos Anéis",
  "author": "J.R.R. Tolkien",
  "publishedYear": 1954,
  "isRead": true
}
$ GET http://localhost:3000/books

$ PATCH http://localhost:3000/books/1/read-status
{
 "isRead": false
}
$ PATCH http://localhost:3000/books/1
{
  "title": "O Senhor dos Anéis 2",
  "author": "J.R.R. Tolkien",
  "publishedYear": 1955,
  "isRead": false
}
$ GET http://localhost:3000/books/1
$ DELETE http://localhost:3000/books/1

# Usando curl no terminal
$ curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -d '{"title": "O Senhor dos Anéis", "author": "J.R.R. Tolkien", "publishedYear": 1954, "isRead": false}'
$ curl -X GET http://localhost:3000/books
$ curl -X PATCH http://localhost:3000/books/1 -H "Content-Type: application/json" -d '{"title": "O Senhor dos Anéis 2", "author": "J.R.R. Tolkien", "publishedYear": 1955, "isRead": false}'
$ curl -X PATCH http://localhost:3000/books/1/read-status -H "Content-Type: application/json" -d '{"isRead": true}'
$ curl -X GET http://localhost:3000/books/1
$ curl -X DELETE http://localhost:3000/books/1
```

