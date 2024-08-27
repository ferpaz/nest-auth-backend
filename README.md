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

Copiar el archivo `.env.template` a `.env` y especificar la url en la que escucha MongoDb y el nombre de la base de datos; además se pueden configurar las variables para la generación del token JWT (SEED y EXPIRATION).

Finalmente se puede especificar el puerto por defecto de escucha de este backend.

### Cadena de Conexión a MongoDb

Por ejemplo:

```plaintext
MONGO_URI=mongodb://localhost:27017/database
```

### Nombre de la base de datos de Mongo

Por ejemplo:

```plaintext
MONGO_DB_NAME=auth-db
```

### Puerto por defecto en el que escucha este backend

Por ejemplo:

```plaintext
PORT=3000
```

### JWT Token Generator

Por ejemplo:

```plaintext
JWT_SEED=<frase-totalmente-secreta>
JWT_EXPIRATION=1h
```
