"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const route = express_1.default.Router();
route.get('/api/user/', UserController_1.default.select);
route.get('/api/user/:id', UserController_1.default.selectOne);
route.post('/api/user/', UserController_1.default.create);
route.delete('/api/user/:email', UserController_1.default.softDelete);
route.post('/validate', UserController_1.default.validate);
route.post('/init', UserController_1.default.init);
exports.default = route;
//# sourceMappingURL=user.js.map