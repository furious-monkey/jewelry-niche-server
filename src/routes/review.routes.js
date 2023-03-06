const express = require('express');
const { getAllReview, addNewReview } = require('../controllers/reviews.controller');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/', getAllReview);

router.post('/', addNewReview);

module.exports = router;