const express = require('express');
const { body } = require('express-validator');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

const validateTask = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .trim(),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .trim(),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status must be Pending, In Progress, or Completed'),
  body('priority')
    .notEmpty()
    .withMessage('Priority is required')
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),
  body('dueDate')
    .notEmpty()
    .withMessage('Due date is required')
    .isISO8601()
    .withMessage('Due date must be a valid date'),
];

router.route('/')
  .get(getTasks)
  .post(validateTask, createTask);

router.route('/:id')
  .get(getTask)
  .put(validateTask, updateTask)
  .delete(deleteTask);

module.exports = router;
