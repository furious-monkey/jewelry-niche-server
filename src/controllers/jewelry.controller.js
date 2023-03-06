const { ObjectId } = require('mongodb');
const { getDatabase } = require('../../config/db.config');

// find all jewelry product from database
exports.getAllJewelry = async (req, res) => {
  const db = getDatabase();
  const jewelryCollection = db.collection("jewelry");
  const jewelry = await jewelryCollection.find({}).toArray();
  res.status(200).send(jewelry);
}

// Add a newJewelry product to database collection
exports.addJewelry = async (req, res) => {
  const db = getDatabase();
  const jewelryCollection = db.collection("jewelry");
  const product = req.body;
  const result = await jewelryCollection.insertOne(product);
  res.status(201).json(result);
}

// find single jewelry product from database
exports.getJewelryById = async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) }
  const db = getDatabase();
  const jewelryCollection = db.collection("jewelry");
  const cursor = await jewelryCollection.findOne(query);
  res.status(200).send(cursor);
}

// Delete a Single Product API 
exports.deleteJewelryById = async (req, res) => {
  const id = req.params.id;
  const quary = { _id: ObjectId(id) };
  const db = getDatabase();
  const jewelryCollection = db.collection("jewelry");
  const result = await jewelryCollection.deleteOne(quary);
  res.status(200).send(result);
}
