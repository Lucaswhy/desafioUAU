"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const database_1 = __importDefault(require("../config/database"));
const UserInfo_1 = __importDefault(require("./UserInfo"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: sequelize_1.default.STRING,
    email: {
        type: sequelize_1.default.STRING,
        unique: true
    },
    password: sequelize_1.default.STRING,
    active: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: true
    },
    token: sequelize_1.default.STRING
}, { sequelize: database_1.default });
User.hasOne(UserInfo_1.default, { foreignKey: 'UserInfo_id' });
exports.default = User;
//# sourceMappingURL=user.js.map