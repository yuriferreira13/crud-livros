
## Descrição

 Aplicação simples de cadastro de livros

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

## Testes de Endpoints

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
$ GET http://localhost:3000/books/1
$ DELETE http://localhost:3000/books/1

# Usando curl no terminal
$ curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -d '{"title": "O Senhor dos Anéis", "author": "J.R.R. Tolkien", "publishedYear": 1954, "isRead": false}'
$ curl -X GET http://localhost:3000/books
$ curl -X PATCH http://localhost:3000/books/1/read-status -H "Content-Type: application/json" -d '{"isRead": true}'
$ curl -X GET http://localhost:3000/books/1
$ curl -X DELETE http://localhost:3000/books/1
```

