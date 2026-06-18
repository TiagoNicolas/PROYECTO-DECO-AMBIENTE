const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ambientes", (req, res) => {
  db.query(
    "SELECT * FROM ambientes",
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
});

app.listen(3001, () => {
  console.log("Servidor funcionando en puerto 3001");
});