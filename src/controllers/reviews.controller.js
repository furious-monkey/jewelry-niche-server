const { getDatabase } = require('../../config/db.config');
const ObjectId = require('mongodb').ObjectId;


// @desc Get All review to database collection
// @route GET /review/
// @access public
exports.getAllReview = async (req, res) => {
  const db = getDatabase();
  const reviewCollection = db.collection("review");
  const result = await reviewCollection.find({}).toArray();
  res.send(result);
}

// @desc Add new review to database collection
// @route POST /review/
// @access public
exports.addNewReview = async (req, res) => {
  const db = getDatabase();
  const reviewCollection = db.collection("review");
  const review = req.body;
  const result = await reviewCollection.insertOne(review);
  res.json(result);
}