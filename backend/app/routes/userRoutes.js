const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../../config/passport');


// router.get('/users', passport.authenticate('jwt', { session: false }), userController.getUsers);
 

module.exports = router;