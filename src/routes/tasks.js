const express = require('express');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

// Create Task
router.post('/', auth, createTask);

// Get Tasks
router.get('/', auth, getTasks);

// Update Task
router.put('/:id', auth, updateTask);

// Delete Task
router.delete('/:id', auth, role(['admin']), deleteTask);

module.exports = router;
