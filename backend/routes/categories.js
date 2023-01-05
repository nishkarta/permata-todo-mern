const express = require('express');
const Category = require('../models/categoryModel');
const {
    getCategories,
    getCategory,
    createCategory,
    deleteCategory,
    updateCategory
} = require('../controllers/categoryController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

// GET all categories
router.get('/', getCategories)

//GET a single category
router.get('/:id', getCategory)

// POST a new category
router.post('/', createCategory)

// DELETE category
router.delete('/:id', deleteCategory)

// UPDATE category
router.patch('/:id', updateCategory)


module.exports = router