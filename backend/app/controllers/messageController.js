const messageService = require('../services/messageService');

const getMessages = async (req, res) => {
    const userId = req.user._id
    try {
        let data = {}
        switch (req.params.target) {
            case 'channel':
                data = await messageService.getChannelMessages(req.query.channelId);
                break;
            case 'user':
                data = await messageService.getUserMessages(userId, req.query.companionId);
                break;
            default:
                break;
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ data: null, error: true, message: 'Error Getting Messages' });
    }
};

const createMessage = async (req, res) => {
    const userId = req.user._id
    const username = req.user.username
    const { toUser, toChannel, message } = req.body
    try {
        const data = await messageService.createMessage(username, userId, toUser, toChannel, message);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ data: null, error: true, message: 'Error Creating Message' });
    }
};

const updateMessage = async (req, res) => {
    const userId = req.user._id
    const messageId = req.params.id
    const message = req.body.message
    try {
        const data = await messageService.updateMessage(userId, messageId, message);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ data: null, error: true, message: 'Error Updating Message' });
    }
};

const deleteMessage = async (req, res) => {
    const userId = req.user._id
    const messageId = req.params.id
    try {
        const data = await messageService.deleteMessage(userId, messageId);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ data: null, error: true, message: 'Error Deleting Message' });
    }
};

module.exports = { getMessages, createMessage, updateMessage, deleteMessage }
