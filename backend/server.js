const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());


// GET AMBIENTES
app.get("/api/ambientes", (req, res) => {
  db.query("SELECT * FROM ambientes", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json(results);
  });
});


// GET MOBILIARIO
app.get("/api/mobiliario", (req, res) => {
  db.query("SELECT * FROM mobiliario", (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
});


// AGREGAR AMBIENTES
app.post("/api/ambientes", (req, res) => {
  const {
    nombre,
    tipo,
    metros_cuadrados,
    cantidad_muebles,
    estado
  } = req.body;

  db.query(
    "INSERT INTO ambientes (nombre, tipo, metros_cuadrados, cantidad_muebles, estado) VALUES (?, ?, ?, ?, ?)",
    [nombre, tipo, metros_cuadrados, cantidad_muebles, estado],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "Ambiente agregado"
      });
    }
  );
});


// MODIFICAR AMBIENTES
app.put("/api/ambientes/:id", (req, res) => {
  const {
    nombre,
    tipo,
    metros_cuadrados,
    cantidad_muebles,
    estado
  } = req.body;

  db.query(
    "UPDATE ambientes SET nombre=?, tipo=?, metros_cuadrados=?, cantidad_muebles=?, estado=? WHERE id=?",
    [
      nombre,
      tipo,
      metros_cuadrados,
      cantidad_muebles,
      estado,
      req.params.id
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "Ambiente actualizado"
      });
    }
  );
});


// BORRAR AMBIENTES
app.delete("/api/ambientes/:id", (req, res) => {
  db.query(
    "DELETE FROM ambientes WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "Ambiente eliminado"
      });
    }
  );
});


app.listen(3001, () => {
  console.log("Servidor funcionando en puerto 3001");
});