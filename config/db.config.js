const { MongoClient } = require('mongodb');
require('dotenv').config();

// define the MongoDB client
const client = new MongoClient(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// to store the database instance
let database; 

// this function will establish the connection with the MongoDB and create a database instance.
const connectToDatabase = async () => {
  try {
    await client.connect(); // connect to client
    console.log('Connected to MongoDB successfully!');
    database = client.db("jewelry_store"); // Assign Database to our global variable "database"
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// This function will returns already created database instance or throws an error if it's not yet initialized.
const getDatabase = () => {
  if (database) {
    return database;
  } else {
    throw new Error('Database connection not established yet.');
  }
};

module.exports = {
  connectToDatabase, // export connection function
  getDatabase       // export function which returns DB instance
};
