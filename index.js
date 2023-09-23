// servidor api rest
const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());

// Creamos una conexión a la base de datos MySQL
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "libreria",
});
// Conectamos a la base de datos
db.getConnection((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos: ", err);
    return;
  }
  console.log("Conexión a la base de datos establecida");
});

global.db = db;

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/libros", function (req, res) {
  const sqlSelect = "SELECT  * FROM libros";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener los libros");
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});
//obtener libro por query
app.get("/libro", function (req, res) {
  const id = req.query.id;

  const sqlSelect = "SELECT  * FROM libros WHERE libro_id = ?";
  db.query(sqlSelect, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener los libros");
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});

//insertar libro
app.post("/insertarLibro", function (req, res) {
  const id = null;
  const titulo = req.body.titulo;
  const autor = req.body.autor;
  const isbn = req.body.isbn;
  const precio = req.body.precio;
  const img = req.body.img;

  //const sqlInsert =
  //"INSERT INTO libros (libro_id, titulo, autor, isbn, precio, img) VALUES (?, ?, ?, ?, ?, ?)";
  const sqlinsert = `INSERT INTO libros (libro_id, titulo, autor, isbn, precio, img) VALUES (${id}, '${titulo}', '${autor}', '${isbn}', '${precio}', '${img}')`;
  db.query(sqlinsert, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al insertar el libro");
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});

//eliminar libro
app.post("/eliminarLibro", function (req, res) {
  const libro_id = req.body.libro_id;
  console.log(libro_id);

  const sqlDelete = "DELETE FROM libros WHERE libro_id = ?";
  db.query(sqlDelete, [libro_id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al eliminar el libro");
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});

//actualizar libro
app.post("/actualizarLibro", function (req, res) {
  const libro = req.body;
  console.log(req.body);

  const sqlUpdate = `UPDATE libros SET titulo = '${libro.titulo}', autor = '${libro.autor}', ISBN = '${libro.ISBN}', precio = '${libro.precio}', img = '${libro.img}' WHERE libro_id = ${libro.libro_id}`;
  db.query(sqlUpdate, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al actualizar el libro");
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});

app.listen(3001);
