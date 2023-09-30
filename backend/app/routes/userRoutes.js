const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authMiddleware')


router.get('/users', authenticateJWT, userController.getUsers);


module.exports = router;