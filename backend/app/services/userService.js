const User = require('../models/User');

const getUsers = async (userId) => {
    try {
        const users = await User.find({})
            .select('_id username')
            .exec();

        return {
            data: users,
            error: false,
            message: 'Users List Recieved'
        };

    } catch (error) {
        throw error
    }
};

module.exports = { getUsers }