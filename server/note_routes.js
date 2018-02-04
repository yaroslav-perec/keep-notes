module.exports = function(app, database) {

  app.get('/notes', (req, res) => {
    const sql = "SELECT * FROM notes ORDER BY id";

    database.query(sql, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      }
      res.send(result);
    });
  });

  app.get('/notes/:id', (req, res) => {
    const ID = req.params.id;
    const sql = "SELECT * FROM notes WHERE id = ?";

    database.query(sql, [ID], (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      }
      res.send(result);
    });
  });

  app.put('/notes/:id', (req, res) => {
    const ID = req.params.id;
    const sql = `UPDATE notes SET note = ?, date = NOW() WHERE id = ?`;

    database.query(sql, [req.body.note, ID], (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      }
      res.send(result);
    });
  });

  app.delete('/notes/:id', (req, res) => {
    const ID = req.params.id;
    const sql = "DELETE FROM notes WHERE id = ?";

    database.query(sql, [ID], (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      }
      res.send(`Notes deleted: ${result.affectedRows}`);
    });
  });

  app.post('/notes', (req, res) => {
    const sql = "INSERT INTO notes (note, date) VALUES (?, NOW())";

    database.query(sql, [req.body.note], (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      }
      res.send(`1 record inserted, ID: ${result.insertId}`);
    });
  });
};
