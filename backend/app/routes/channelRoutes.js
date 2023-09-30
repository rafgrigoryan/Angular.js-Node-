const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController')
const authenticateJWT = require('../middlewares/authMiddleware')

router.get('/channels', authenticateJWT, channelController.getChannels);

module.exports = router;