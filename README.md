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

#### Criando um Model

```
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/example', {
  useNewUrlParser: true,
});
const Person = mongoose.model('Person', { name: String, description: String });
```

#### Utilizando seu Model

```
const ze = new Person({name: 'Jose da Silva', description: 'Aluno da Gama'});
ze.save().then(() => console.log('Salvo!'));
```

## Juntando tudo


#### Configurar para ler corpo de request em JSON

```
$ npm install body-parser --save
```

```
const bodyParser = require('body-parser');
app.use(bodyParser.json());
```

#### CRUD

###### Create

```
app.post('/person', (req, res) => {
  const person = new Person({
    name: req.body.name,
    description: req.body.description
  });

  person.save()
    .then(_ => res.send(person))
    .catch(_ => res.status(500).send({message: "Algo errado aconteceu"}));
});
```
###### Read


Lista
```
app.get('/person', (req, res) => {
  Person.find().limit(10)
    .then(people => res.send(people));
});
```

Um único registro
```
app.get('/person/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => res.send(person));
});
```

###### Update

```
app.put('/person/:id', (req, res) => {
  Person.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(person => res.send(person));
});
```

###### Destroy

```
app.delete('/person/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(person => {
      if(person) { res.send(person); }
      else { res.status(404).send({message: "Não encontrado"}); }
    });
});
```

# Material extra

## Testes

https://mochajs.org/

https://www.chaijs.com/

https://www.chaijs.com/plugins/chai-http/


## Autenticação

http://www.passportjs.org/

## Boas práticas

https://github.com/i0natan/nodebestpractices

https://expressjs.com/en/advanced/best-practice-performance.html

## Tratamento de erros

https://expressjs.com/en/guide/error-handling.html

## Logs/Rastreabilidade

https://github.com/expressjs/morgan
