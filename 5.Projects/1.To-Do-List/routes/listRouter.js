const express = require('express');
const listController = require('../controller/listController');

const router = express.Router();
router.post('/add-task', listController.createTask);
router.get('/get-tasks', listController.getTasks);
router.delete('/delete-task/:id', listController.deleteTask);
router.put('/update-task/:id', listController.updateTask);

module.exports = router;

