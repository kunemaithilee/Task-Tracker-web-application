const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const ApiResponse = require('../utils/ApiResponse');

const getTasks = asyncHandler(async (req, res) => {
  const { search, status, priority, sort } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (status) {
    query.status = status;
  }

  if (priority) {
    query.priority = priority;
  }

  const priorityMap = { High: 3, Medium: 2, Low: 1 };
  const statusMap = { 'In Progress': 2, Pending: 1, Completed: 3 };

  let sortOption = { createdAt: -1 };
  let useCustomSort = false;

  switch (sort) {
    case 'oldest':
      sortOption = { createdAt: 1 };
      break;
    case 'dueDate':
      sortOption = { dueDate: 1 };
      break;
    case 'dueDateDesc':
      sortOption = { dueDate: -1 };
      break;
    case 'priority':
      useCustomSort = true;
      break;
    case 'priorityAsc':
      useCustomSort = true;
      break;
    case 'titleAsc':
      sortOption = { title: 1 };
      break;
    case 'titleDesc':
      sortOption = { title: -1 };
      break;
    case 'status':
      useCustomSort = true;
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  let tasks;
  if (useCustomSort) {
    tasks = await Task.find(query).lean();
    if (sort === 'priority') {
      tasks.sort((a, b) => (priorityMap[b.priority] || 0) - (priorityMap[a.priority] || 0));
    } else if (sort === 'priorityAsc') {
      tasks.sort((a, b) => (priorityMap[a.priority] || 0) - (priorityMap[b.priority] || 0));
    } else if (sort === 'status') {
      tasks.sort((a, b) => (statusMap[a.status] || 0) - (statusMap[b.status] || 0));
    }
  } else {
    tasks = await Task.find(query).sort(sortOption);
  }

  ApiResponse.success(res, tasks, 'Tasks fetched successfully');
});

const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  ApiResponse.success(res, task, 'Task fetched successfully');
});

const createTask = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array().map((e) => e.msg).join(', '));
  }

  const { title, description, status, priority, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
  });

  res.status(201);
  ApiResponse.success(res, task, 'Task created successfully');
});

const updateTask = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array().map((e) => e.msg).join(', '));
  }

  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const { title, description, status, priority, dueDate } = req.body;

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;
  task.priority = priority || task.priority;
  task.dueDate = dueDate || task.dueDate;

  const updatedTask = await task.save();

  ApiResponse.success(res, updatedTask, 'Task updated successfully');
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.deleteOne();

  ApiResponse.success(res, null, 'Task deleted successfully');
});

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
