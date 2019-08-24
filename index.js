const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/notes', { useNewUrlParser: true });

const Notes = mongoose.model('notes', {title: String, description: String});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Formulário HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// CRUD
// CREATE => POST
// /notes

app.post('/notes', (req, res) => {
  const { title, description } = req.body;
  const note = new Notes({
    title,
    description
  });

  note.save()
    .then((savedNote) => res.send(savedNote))
    .catch(_ => res.status(500).send({message: "Algo de errado aconteceu"}));

});

// READ => GET

// /notes (lista)

app.get('/notes', (req, res) => {
  Notes.find().limit(10)
    .then((notes) => res.send(notes))
    .catch(_ => res.status(500).send({message: "Algo de errado aconteceu"}));
});

// /notes/:id

app.get('/notes/:id', (req, res) => {
  Notes.findById(req.params.id)
    .then((note) => res.send(note))
    .catch(_ => res.status(404).send({message: "Nota não encontrada"}));
});

// UPDATE => PUT/PATCH
// /notes/:id

app.put('/notes/:id', (req, res) => {
  const { title, description } = req.body;
  Notes.findByIdAndUpdate(req.params.id, { title, description }, { new: true })
    .then((note) => res.send(note))
    .catch(_ => res.status(404).send({message: "Nota não encontrada"}));
});

// DESTROY => DELETE
// /notes/:id

app.delete('/notes/:id', (req, res) => {
  Notes.findByIdAndDelete(req.params.id)
    .then((note) => {
      if(note) { res.send(note); }
      else { res.status(404).send({message: "Nota não encontrada"}); }
    })
    .catch(_ => res.status(500).send({message: "Algo de errado aconteceu"}));
});


app.listen(3000);
