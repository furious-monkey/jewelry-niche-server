const { ObjectId } = require('mongodb');
const { getDatabase } = require('../../config/db.config');

// @desc Get All orders from database
// @route GET /orders/
// @access private
exports.getAllUser = async (req, res) => {
  const db = getDatabase();
  const usersCollection = db.collection("users");
  const cursor = await usersCollection.find({}).toArray();
  res.send(cursor);
}

//export postNewUser
exports.postNewUser = async (req, res) => {
  const user = req.body;
  const db = getDatabase();
  const usersCollection = db.collection("users");
  const result = await usersCollection.insertOne(user);
  res.json(result);
}

//export updateUser
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

//export makeUserAdmin
exports.makeUserAdmin = async (req, res) => {
  const db = getDatabase();
  const usersCollection = db.collection("users");
  const user = req.body;
  const filter = { email: user.email };
  const updateDoc = { $set: { role: 'admin' } };
  const result = await usersCollection.updateOne(filter, updateDoc);
  res.json(result);
}

//export checkAdminByEmail
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