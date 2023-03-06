const express = require('express');
const {  getAllUser, postNewUser, updateUser, makeUserAdmin, checkAdminByEmail } = require('../controllers/users.controller');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/', getAllUser);
router.post('/', postNewUser);
router.put('/', updateUser);
router.put('/admin', makeUserAdmin);
router.get('/:email', checkAdminByEmail);

module.exports = router;