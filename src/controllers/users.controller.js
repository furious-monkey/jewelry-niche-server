const { ObjectId } = require('mongodb');
const { getDatabase } = require('../../config/db.config');

// @desc Get All users from database
// @route GET /users/
// @access private
exports.getAllUser = async (req, res) => {
  const db = getDatabase();
  const usersCollection = db.collection("users");
  const cursor = await usersCollection.find({}).toArray();
  res.send(cursor);
}

// @desc Add new user to the database
// @route POST /users/
// @access private
exports.postNewUser = async (req, res) => {
  const user = req.body;
  const db = getDatabase();
  const usersCollection = db.collection("users");
  const result = await usersCollection.insertOne(user);
  res.json(result);
}

// @desc Update user in the database
// @route PUT /users/:id
// @access private
exports.updateUser = async (req, res) => {
  const user = req.body;
  const filter = { email: user.email };
  const options = { upsert: true };
  const updateDoc = { $set: user };
  const db = getDatabase();
  const usersCollection = db.collection("users");
  const result = await usersCollection.updateOne(filter, updateDoc, options);
  res.json(result);
}

// @desc Make user admin in the database
// @route PUT /users/make-admin
// @access private
exports.makeUserAdmin = async (req, res) => {
  const db = getDatabase();
  const usersCollection = db.collection("users");
  const user = req.body;
  const filter = { email: user.email };
  const updateDoc = { $set: { role: 'admin' } };
  const result = await usersCollection.updateOne(filter, updateDoc);
  res.json(result);
}

// @desc Check if user is an admin by email
// @route GET /users/admin/:email
// @access private
exports.checkAdminByEmail = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const db = getDatabase();
  const usersCollection = db.collection("users");
  const user = await usersCollection.findOne(query);
  let isAdmin = false;
  if (user?.role === 'admin') {
    isAdmin = true;
  }
  res.json({ admin: isAdmin });
}