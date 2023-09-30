const channelService = require('../services/channelService');

const getChannels = async (req, res) => {
    const userId = req.user._id
    try {
        const data = await channelService.getChannels(userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ data: null, error: true, message: 'Error Getting Channels' });
    }
};

module.exports = { getChannels }
