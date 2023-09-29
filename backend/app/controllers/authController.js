const authService = require('../services/authService');

const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const data = await authService.authenticateUser(username, password);
        res.status(200).json(data);
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};

const refreshTokens = async (req, res) => {
    const { username, password } = req.body
    try {
        const data = await authService.refreshTokens(username, password);
        res.status(200).json(data);
    } catch (error) {
        res.status(401).json({ error: 'Refresh Token Failed' });
    }
};

module.exports = { login,refreshTokens }
