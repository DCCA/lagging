import express from 'express';
import client from './utils/database';
import { MongoError } from 'mongodb';

const app = express();

app.get('/', (req, res, next) => {
  res.send('This is a time tracking app');
});

client
  .connect()
  .then(() => {
    console.log('DB Connected');
    app.listen(3000, () => {
      console.log('App listening on port 300');
    });
  })
  .catch((err: MongoError) => {
    console.log(err);
  });
