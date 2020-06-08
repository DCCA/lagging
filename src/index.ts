import express from 'express';
import 'express-async-errors';
import client from './utils/database';
import bodyParser from 'body-parser';

// Import routes
import signupRoutes from './routes/signup';
import { Mongoose } from 'mongoose';
// Start app
const app = express();
app.use(bodyParser.json());

app.use('/api/v1', signupRoutes);

app.get('/', (req, res, next) => {
  res.send('This is a time tracking app');
});

client
  .then(() => {
    console.log('DB Connected');
    app.listen(3000, () => {
      console.log('App listening on port 300');
    });
  })
  .catch((err) => console.log('Error connecting to DB'));
