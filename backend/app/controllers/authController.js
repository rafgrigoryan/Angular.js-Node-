const authService = require('../services/authService');

const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const data = await authService.authenticateUser(username, password);
        res.status(200).json(data);
    } catch (error) {
        res.status(401).json({ data: null, error: true, message: 'Authentication failed' });
    }
};

const refreshTokens = async (req, res) => {
    const { refreshToken } = req.body
    try {
        const data = await authService.refreshTokens(refreshToken);
        res.status(200).json(data);
    } catch (error) {
        res.status(401).json({ data: null, error: true, message: 'Refreshing Token Failed' });
    }
};

module.exports = { login, refreshTokens }
