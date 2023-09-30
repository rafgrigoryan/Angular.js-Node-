const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const channelRoutes = require('./channelRoutes');
const messageRoutes = require('./messageRoutes');
const express = require('express');
const router = express.Router();

router.use(authRoutes)
router.use(userRoutes)
router.use(channelRoutes)
router.use(messageRoutes)

router.use((req, res, next) => {
    res.status(404).json({ error: 'API you called does not exist ;)' });
});

module.exports = router;