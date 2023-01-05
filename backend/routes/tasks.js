const express = require('express');
const Task = require('../models/taskModel')
const {
    getTasks,
    getTasksByCategory,
    getTask,
    createTask,
    deleteTask,
    deleteTasksByCategory,
    updateTask
} = require('../controllers/taskController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)


// GET all tasks
router.get('/', getTasks)

// GET tasks by category
router.get('/category/:categoryID', getTasksByCategory)

//GET a single task
router.get('/:id', getTask)

// POST a new task
router.post('/', createTask)

// DELETE task
router.delete('/:id', deleteTask)
router.delete('/category/:categoryID', deleteTasksByCategory)

// UPDATE task
router.patch('/:id', updateTask)


module.exports = router