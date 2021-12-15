"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const config = process.env;
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send('Um token é requerido para verificação.');
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        next();
    }
    catch (err) {
        return res.status(401).send('Token inválido ou expirou.');
    }
    return next();
};
exports.default = verifyToken;
//# sourceMappingURL=token.js.map