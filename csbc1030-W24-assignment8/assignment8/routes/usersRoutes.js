const express = require('express')
const router = express.Router()
const authenticateToken = require('../middlewares/authMiddleware')
// Import the User model
const { User } = require('../models')
const {loginHandler, getAllUsers, getUserById, addUser } = require('../controllers/usersController')

// Route for user login
router.post('/login', loginHandler)

// Route to get all users
router.get('/', getAllUsers)

// Route to get a specific user by ID
router.get('/:id', authenticateToken, getUserById)

// Route to add a new user
router.post('/', authenticateToken, addUser)

module.exports = router
