# Criando uma API básica com ExpressJs e MongoDB

## Instalando NodeJs

https://nodejs.org/en/download/ para fazer o download e instalação manual

https://nodejs.org/en/download/package-manager/ para instalar utilizando um package manager


## Inicializando o projeto

```
$ mkdir meuprojeto
$ cd meuprojeto
$ npm init
```

## ExpressJS

#### Instalação

```
$ mkdir meuprojeto
$ npm install express --save
```

#### Hello World com ExpressJS


no arquivo index.js
```
const express = require('express');
const app = express();

app.get('/', (req,res) => {
  res.send("Hello World!");
});

app.listen(3000);
```

Para rodar o server

```
$ node index.js
```

Acesse http://localhost:3000/ para ver o resultado

## MongoDB

#### Instalação

###### Docker compose

https://docs.docker.com/install/ para instalar Docker

https://docs.docker.com/compose/install/ para instalar docker-compose

Crie um arquivo chamado docker-compose.yml na raíz do projeto com:
```
version: '3.1'

services:

  mongo:
    image: mongo
    restart: always
    ports:
      - "27017:27017"
```

Comando para ligar seu compose
```
$ docker-compose up
```

###### Na máquina

https://docs.mongodb.com/manual/installation/ para instalação direto na sua máquina

#### Instalando Mongoose

```
$ npm install mongoose --save
```
