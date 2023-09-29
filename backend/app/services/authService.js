const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticateUser = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Invalid password');
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '10d',
    });

    return { user, accessToken, refreshToken };
};

const refreshTokens = async (refreshToken) => {

}



module.exports = { authenticateUser, refreshTokens }