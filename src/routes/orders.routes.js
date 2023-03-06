const express = require('express');
const router = express.Router();

const { getAllOrder, findOrdersByEmail, addNewOrder, updateOrderById, deleteOrderById } = require('../controllers/orders.controller');

// This route will GET all orders from the database
router.get('/', getAllOrder);

// This route will ADD new order product to database collection
router.post('/', addNewOrder);

// This route will GET user's all order products by email address
router.get('/:email', findOrdersByEmail);

// This route will UPDATE the status of an order as shipped in MongoDB by id
router.put('/:id', updateOrderById);

// This route will DELETE a specific order from the MongoDB database based on its ID
router.delete('/:id', deleteOrderById);

module.exports = router;