const { ObjectId } = require('mongodb');
const { getDatabase } = require('../../config/db.config');

// @desc Get All orders from database
// @route GET /orders/
// @access private
exports.getAllOrder = async (req, res) => {
  const db = getDatabase();
  const ordersCollection = db.collection("orders");
  const cursor = await ordersCollection.find({}).toArray();
  res.send(cursor);
}

// @desc Find orders by email address
// @route GET /orders/:email
// @access private
exports.findOrdersByEmail = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const db = getDatabase();
  const ordersCollection = db.collection("orders");
  const order = await ordersCollection.find(query).toArray();
  res.send(order);
}

// @desc Add a new order
// @route POST /orders/add
// @access private
exports.addNewOrder = async (req, res) => {
  const product = req.body;
  const db = getDatabase();
  const ordersCollection = db.collection("orders");
  const result = await ordersCollection.insertOne(product);
  res.json(result);
}


// @desc Delete a Single Order by ID
// @route DELETE /orders/:id
// @access private 
exports.deleteOrderById = async (req, res) => {
  const id = req.params.id;
  const quary = { _id: ObjectId(id) };
  const db = getDatabase();
  const ordersCollection = db.collection("orders");
  const result = await ordersCollection.deleteOne(quary);
  res.json(result);
}

// @desc Update orders status by ID
// @route PUT /orders/:id/update
// @access private
exports.updateOrderById = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      status: "shipped"
    },
  };
  const db = getDatabase();
  const ordersCollection = db.collection("orders");
  const result = await ordersCollection.updateOne(filter, updateDoc, options);
  res.json(result);
}