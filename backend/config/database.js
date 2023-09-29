const mongoose = require('mongoose');
const { MONGO_USERNAME, MONGO_PASSWORD } = process.env
const dbURI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.rknelzj.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB `);
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});


module.exports = mongoose;
