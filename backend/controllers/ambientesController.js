const db = require("../config/db");

const obtenerAmbientes = (req, res) => {
  db.query(
    "SELECT * FROM ambientes",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

module.exports = {
  obtenerAmbientes
};