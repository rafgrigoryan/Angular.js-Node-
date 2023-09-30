const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticateUser = async (username, password) => {
    try {
        const user = await User.findOne({ username });

        if (!user) {
            throw new Error('User not found');
        };

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Invalid password');
        };

        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '10d',
        });

        return {
            data: {
                user: { _id: user.id, username: user.username },
                accessToken,
                refreshToken
            },
            error: false,
            message: 'Logged in Successfully'
        };

    } catch (error) {
        throw error
    }
};

const refreshTokens = async (refreshToken) => {
    try {
        const JwtSecret = process.env.JWT_SECRET
        const decoded = jwt.verify(refreshToken, JwtSecret);

        const currentTimestamp = Math.floor(Date.now() / 1000); 
        if (decoded.exp && decoded.exp >= currentTimestamp) {
            const accessToken = jwt.sign({ userId: decoded.userId }, JwtSecret, {
                expiresIn: '1h',
            });
            const refreshToken = jwt.sign({ userId: decoded.userId }, JwtSecret, {
                expiresIn: '10d',
            });

            return {
                data: {
                    accessToken,
                    refreshToken
                },
                error: false,
                message: 'Token Refreshed Successfully'
            };
        } else {
            console.log('Token has expired.');
            throw new Error('Token has expired !')
        }
    } catch (error) {
        throw error
    }

}



module.exports = { authenticateUser, refreshTokens }