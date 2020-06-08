import express from 'express';
import 'express-async-errors';
import client from './utils/database';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

// Import routes
import signupRoutes from './routes/signup';
import loginRoutes from './routes/login';
// Start app
const app = express();
app.use(bodyParser.json());

app.use('/api/v1', signupRoutes);
app.use('/api/v1', loginRoutes);

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
