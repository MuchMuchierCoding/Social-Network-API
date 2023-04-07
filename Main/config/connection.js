require('dotenv').config()
const { connect, connection } = require('mongoose');

const connectionString =
process.env.MONGODB_URI || process.env.MONGODB_DEV;


connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
