"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = __importDefault(require("./token"));
const user_1 = __importDefault(require("../API/user"));
const routes = express_1.Router();
routes.use('/', user_1.default);
routes.get('/status', token_1.default, (req, res) => {
    res.json({
        error: false,
        message: 'Server is working normally.'
    });
});
routes.get('*', function (req, res) {
    res.render('index');
});
exports.default = routes;
//# sourceMappingURL=index.js.map