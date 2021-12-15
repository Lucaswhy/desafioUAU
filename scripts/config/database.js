"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDatabase = void 0;
const sequelize_1 = require("sequelize");
const database = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '123456',
    database: 'uaubox',
    port: 5432,
    define: {
        timestamps: true,
        freezeTableName: true
    }
});
function startDatabase() {
    try {
        database.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
    try {
        database.sync();
    }
    catch (error) {
        console.error('Unable to sync with models: ', error);
    }
}
exports.startDatabase = startDatabase;
exports.default = database;
//# sourceMappingURL=database.js.map