import mongoose from 'mongoose';
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@node-complete-bftj6.gcp.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
const client = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default client;
