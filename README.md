# Nest Backend

## Description

[Nest](https://github.com/nestjs/nest) framework Backend

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## MongoDB

Se está utilizando Mongo DB para persistir los datos del Backend

```bash
# start docker container
$ docker compose up -d
```

### Cadena de Conexión a MongoDb

Copiar el archivo `.env.template` a `.env` y especificar la url en la que escucha MongoDb.

Por ejemplo:

```plaintext
MONGO_URI=mongodb://localhost:27017/database
```
