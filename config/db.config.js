const { MongoClient } = require('mongodb');
require('dotenv').config();


let database;
const client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const connectToDatabase = async () => {
  try {
    // Connect client and make database and connection
    await client.connect();
    console.log('Connected to MongoDB successfully!');
    database = client.db("jewelry_store");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const getDatabase = () => {
  if (database) {
    return database;
  }else{
    throw new Error('Database connection not established yet.');
  }
};

module.exports = { connectToDatabase, getDatabase };