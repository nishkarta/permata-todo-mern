const Category = require('../models/categoryModel')
const mongoose = require('mongoose')

//get all category
const getCategories = async (req, res) => {
    const user_id = req.user._id
    const categories = await Category.find({ user_id }).sort({ createdAt: -1 })

    res.status(200).json(categories)
}

//get a single category
const getCategory = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such category' })
    }

    const category = await Category.findById(id)

    if (!category) {
        res.status(404).json({ err: 'No such category' })
    }

    if (category) {
        res.status(200).json(category)
    }


}

//create new category
const createCategory = async (req, res) => {
    const { title } = req.body

    //add doc to db
    try {
        const user_id = req.user._id
        const category = await Category.create({ title, user_id })
        res.status(200).json(category)
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}

//delete a category
const deleteCategory = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such category' })
    }

    const category = await Category.findOneAndDelete({ _id: id })

    if (!category) {
        return res.status(404).json({ err: 'No such category' })
    }

    res.status(200).json(category)

}

//update a category
const updateCategory = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such category' })
    }

    const category = await Category.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!category) {
        return res.status(404).json({ err: 'No such category' })
    }

    res.status(200).json(category)
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    deleteCategory,
    updateCategory
}