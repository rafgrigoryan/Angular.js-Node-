const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://test_task_user:Ttask@cluster0.rknelzj.mongodb.net/?retryWrites=true&w=majority';

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
