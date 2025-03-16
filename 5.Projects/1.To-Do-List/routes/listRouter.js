const express = require('express');

const listController = require('../controller/listController');
const router = express.Router();
router.post('/add-task', listController.creatTask);

module.exports = router;

