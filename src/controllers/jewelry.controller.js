const { ObjectId } = require('mongodb');
const { getDatabase } = require('../../config/db.config');

// @desc Get all jewelry products from database
// @route GET /jewelry/
// @access public
exports.getAllJewelry = async (req, res) => {
  const db = getDatabase();
  const jewelryCollection = db.collection("jewelry");
  const jewelry = await jewelryCollection.find({}).toArray();
  res.status(200).send(jewelry);
}

// @desc Add a new jewelry product to database
// @route POST /jewelry/
// @access private
exports.addJewelry = async (req, res) => {
  const db = getDatabase();
  const jewelryCollection = db.collection("jewelry");
  const product = req.body;
  const result = await jewelryCollection.insertOne(product);
  res.status(201).json(result);
}

// @desc Get a single jewelry product by id from database
// @route GET /jewelry/:id
// @access public
exports.getJewelryById = async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) }
  const db = getDatabase();
  const jewelryCollection = db.collection("jewelry");
  const cursor = await jewelryCollection.findOne(query);
  res.status(200).send(cursor);
}

// @desc Delete a single jewelry product by id from database
// @route DELETE /jewelry/:id
// @access private 
exports.deleteJewelryById = async (req, res) => {
  const id = req.params.id;
  const quary = { _id: ObjectId(id) };
  const db = getDatabase();
  const jewelryCollection = db.collection("jewelry");
  const result = await jewelryCollection.deleteOne(quary);
  res.status(200).send(result);
}
