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

## Variables de Entorno

Copiar el archivo `.env.template` a `.env` y especificar la url en la que escucha MongoDb y las variables para la generación del token JWT (SEED y EXPIRATION).

### Cadena de Conexión a MongoDb

Por ejemplo:

```plaintext
MONGO_URI=mongodb://localhost:27017/database
```

### JWT Token Generator

Por ejemplo:

```plaintext
JWT_SEED=<frase-totalmente-secreta>
JWT_EXPIRATION=1h
```
