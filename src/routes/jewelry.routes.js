const express = require('express');
const { getAllJewelry, addJewelry, getJewelryById } = require('../controllers/jewelry.controller');
const router = express.Router();

router.get('/', getAllJewelry);
router.post('/', addJewelry);
router.get('/:id', getJewelryById);

module.exports = router;
