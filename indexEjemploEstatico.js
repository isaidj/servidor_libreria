const libros = [
  {
    id: 1,
    titulo: "El señor de los anillos",
    autor: "J.R.R. Tolkien",
    editorial: "Minotauro",
    fecha: "1954",
    genero: "Fantasía",
    //   img: senor_anillos,
  },
  {
    id: 2,
    titulo: "El nombre del viento",
    autor: "Patrick Rothfuss",
    editorial: "Plaza & Janés",
    fecha: "2007",
    genero: "Fantasía",
    //   img: nombre_del_viento,
  },
  {
    id: 3,
    titulo: "El imperio final",
    autor: "Brandon Sanderson",
    editorial: "Nova",
    fecha: "2006",
    genero: "Fantasía",
    //   img: imperio_final,
  },
];
// servidor api rest
const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/libros", function (req, res) {
  try {
    console.log(libros);
    res.send(libros);
  } catch (error) {
    console.log(error);
  }
});
//obtener libro por query
app.get("/libro", function (req, res) {
  const id = req.query.id;
  //   console.log(req);
  try {
    // console.log(libros);
    const libro = libros.find((libro) => libro.id == id);
    res.send(libro);
  } catch (error) {
    console.log(error);
  }
});
//obtener libro por parametro
app.get("/libro", function (req, res) {
  const id = req.params.id;
  //   console.log(req);
  try {
    // console.log(libros);
    const libro = libros.find((libro) => libro.id == id);
    res.send(libro);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001);
