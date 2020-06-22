import express from 'express';
import 'express-async-errors';
import client from './utils/database';
import bodyParser from 'body-parser';

// Import routes
import signupRoutes from './routes/signup';
import loginRoutes from './routes/login';
import taskRoutes from './routes/task';
// Start app
const app = express();
app.use(bodyParser.json());

// Fix cors
app.use((req, res, next) => {
  // Set domains
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Set the methods
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  //
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/v1', signupRoutes);
app.use('/api/v1', loginRoutes);
app.use('/api/v1/tasks', taskRoutes);

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
