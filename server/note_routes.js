var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, database) {
  const DB = database.db('test_database');

  app.get('/notes', (req, res) => {
    DB.collection('notes').find().toArray((err, notes) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(notes);
      }
    });
  });

  app.get('/notes/:id', (req, res) => {
    const ID = req.params.id;
    const DETAILS = { '_id': new ObjectID(ID) };

    DB.collection('notes').findOne(DETAILS, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.put('/notes/:id', (req, res) => {
    const ID = req.params.id;
    const NOTE = { $set: { text: req.body.body, title: req.body.title } };
    const DETAILS = { '_id': new ObjectID(ID) };

    DB.collection('notes').updateOne(DETAILS, NOTE, err => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(NOTE);
      }
    });
  });

  app.delete('/notes/:id', (req, res) => {
    const ID = req.params.id;
    const DETAILS = { '_id': new ObjectID(ID) };

    DB.collection('notes').removeOne(DETAILS, err => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(`Note ${ID} deleted!`);
      }
    });
  });

  app.post('/notes', (req, res) => {
    const NOTE = { text: req.body.body, title: req.body.title };

    DB.collection('notes').insertOne(NOTE, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
