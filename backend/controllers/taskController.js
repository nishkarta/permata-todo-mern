const Task = require('../models/taskModel')
const mongoose = require('mongoose')

//get all tasks
const getTasks = async (req, res) => {
    const user_id = req.user._id
    const tasks = await Task.find({ user_id }).sort({ createdAt: -1 })

    res.status(200).json(tasks)
}

//get tasks by category
const getTasksByCategory = async (req, res) => {
    const { categoryID } = req.params
    const tasks = await Task.find({ category_id: categoryID }).sort({ createdAt: -1 })

    res.status(200).json(tasks)
}

//get tasks by id
const getTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such task' })
    }

    const task = await Task.findById(id)

    if (!task) {
        return res.status(404).json({ err: 'No such task' })
    }

    res.status(200).json(task)
}


//create a new task
const createTask = async (req, res) => {
    const { title, category_id } = req.body
    try {
        const user_id = req.user._id
        const task = await Task.create({
            title, is_active: true, category_id, user_id
        })
        res.status(200).json(task)
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}

//delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such task' })
    }

    const task = await Task.findOneAndDelete({ _id: id })

    if (!task) {
        return res.status(404).json({ err: 'No such task' })
    }

    res.status(200).json(task)

}

//delete a task
const deleteTasksByCategory = async (req, res) => {
    const { categoryID } = req.params

    if (!mongoose.Types.ObjectId.isValid(categoryID)) {
        return res.status(404).json({ err: 'No such category' })
    }

    //const task = await Task.findOneAndDelete({ _id: id })

    const tasks = await Task.deleteMany({ category_id: categoryID })

    if (!tasks) {
        return res.status(404).json({ err: 'No task with such category' })
    }

    res.status(200).json(tasks)

}

//update a task
const updateTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such task' })
    }

    const task = await Task.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!task) {
        return res.status(404).json({ err: 'No such task' })
    }

    res.status(200).json(task)
}

module.exports = {
    getTasks,
    getTasksByCategory,
    getTask,
    createTask,
    deleteTask,
    deleteTasksByCategory,
    updateTask

}