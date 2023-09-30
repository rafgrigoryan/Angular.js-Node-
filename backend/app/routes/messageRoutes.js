const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authenticateJWT = require('../middlewares/authMiddleware')

router.get('/messages/:target', authenticateJWT, messageController.getMessages);
router.post('/message', authenticateJWT, messageController.createMessage);
router.put('/message/:id', authenticateJWT, messageController.updateMessage);
router.delete('/message/:id', authenticateJWT, messageController.deleteMessage);

module.exports = router;