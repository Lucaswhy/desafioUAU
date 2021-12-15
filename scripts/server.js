"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const index_1 = __importDefault(require("./shared/index"));
const app = express_1.default();
database_1.startDatabase();
app.use(express_1.default.json({}));
app.use(express_1.default.urlencoded({ extended: false }));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use((req, res, next) => {
    next();
});
app.use(index_1.default);
const PORT = 8084;
app.listen(PORT, () => {
    console.log('Server up.');
});
//# sourceMappingURL=server.js.map