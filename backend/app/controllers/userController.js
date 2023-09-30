const userService = require('../services/userService');

const getUsers = async (req, res) => {
    const userId = req.user._id
    try {
        const data = await userService.getUsers(userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ data: null, error: true, message: 'Error Getting Users' });
    }
};

module.exports = { getUsers }
