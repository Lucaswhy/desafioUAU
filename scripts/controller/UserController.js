"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../model/user"));
const UserInfo_1 = __importDefault(require("../model/UserInfo"));
class UserEndpoint {
    constructor(name, email, cpf, birthdate, phone, address) {
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.birthdate = birthdate;
        this.phone = phone;
        this.address = address;
    }
}
class UserController {
    select(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.default.findAll({ where: { active: true } });
            try {
                if (users.length > 0) {
                    return (res.status(200).json({
                        error: false,
                        data: users
                    }));
                }
                else {
                    return (res.status(204).json({
                        error: true,
                        data: 'Não há nenhum usuário cadastrado no sistema.'
                    }));
                }
            }
            catch (e) {
                console.log('Erro no index do User. log:' + e);
                return (res.status(500).json({
                    error: true,
                    data: 'Houve um erro no sistema. Por favor tente novamente mais tarde.'
                }));
            }
        });
    }
    selectOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idParams = isNaN(parseInt(req.params.id)) ? undefined : parseInt(req.params.id);
            const userInfo = yield UserInfo_1.default.findByPk(idParams);
            if (userInfo === null)
                return (res.status(404).json({ error: true, data: 'Esse usuário não existe no sistema.' }));
            const user = yield user_1.default.findOne({ where: { active: true, id: userInfo === null || userInfo === void 0 ? void 0 : userInfo.UserInfo_id } });
            if (user === null)
                return (res.status(404).json({ error: true, data: 'Esse usuário não existe no sistema.' }));
            else {
                const userEndpoint = new UserEndpoint(user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.email, userInfo === null || userInfo === void 0 ? void 0 : userInfo.cpf, userInfo === null || userInfo === void 0 ? void 0 : userInfo.birthdate, userInfo === null || userInfo === void 0 ? void 0 : userInfo.phone, userInfo === null || userInfo === void 0 ? void 0 : userInfo.address);
                return (res.status(200).json({
                    error: false,
                    data: userEndpoint
                }));
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.data == null)
                return res.status(204).json({ error: true, data: 'Nenhum dado informado' });
            try {
                yield user_1.default.findOne({ where: { email: req.body.data.email } }).then((user) => {
                    if (user) {
                        return res.status(208).json({ error: true, data: 'E-mail já cadastrado.' });
                    }
                });
                yield UserInfo_1.default.findOne({ where: { cpf: req.body.data.cpf } }).then((user) => {
                    if (user) {
                        return res.status(208).json({ error: true, data: 'CPF já cadastrado.' });
                    }
                });
                const randomString = crypto_1.default.randomBytes(20).toString('hex');
                yield user_1.default.create({
                    name: req.body.data.name,
                    email: req.body.data.email,
                    password: req.body.data.password
                }).then(user => {
                    UserInfo_1.default.create({
                        cpf: req.body.data.cpf,
                        birthdate: req.body.data.birthdate,
                        phone: req.body.data.phone,
                        address: req.body.data.address,
                        UserInfo_id: user.id
                    });
                    const token = jsonwebtoken_1.default.sign({ user_id: user.id, email: user.email, name: user.name }, randomString, {
                        expiresIn: '5h'
                    });
                    user_1.default.update({ token: token }, { where: { email: user.email } });
                });
                return res.status(200).json({
                    error: false,
                    data: 'Usuário criado com sucesso!'
                });
            }
            catch (e) {
                console.log('Erro na criação de um usuário. Log:' + e);
                return res.status(500).json({
                    error: true,
                    data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
                });
            }
        });
    }
    softDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idParams = isNaN(parseInt(req.params.id)) ? undefined : parseInt(req.params.id);
            try {
                yield user_1.default.update({ active: false }, { where: { email: req.params.email } });
                return res.status(200).json({
                    error: false,
                    data: 'Usuário deletado com sucesso.'
                });
            }
            catch (e) {
                console.log('Erro no delete de um usuário. Log:' + e);
                return res.status(500).json({
                    error: true,
                    data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
                });
            }
        });
    }
    validate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!(email && password)) {
                    return res.status(400).json({
                        error: true,
                        data: 'É preciso informar o e-mail ou a senha.'
                    });
                }
                const user = yield user_1.default.findOne({ where: { active: true, email: email } });
                if (user === null || user === undefined) {
                    return res.status(400).json({
                        error: true,
                        data: 'Seu e-mail não existe ou foi desativado, por favor, contate um administrador.'
                    });
                }
                if (user.password === password.toString()) {
                    const randomString = crypto_1.default.randomBytes(20).toString('hex');
                    const token = jsonwebtoken_1.default.sign({ user_id: user.id, email: user.email, name: user.name }, randomString, {
                        expiresIn: '5h'
                    });
                    process.env.TOKEN_KEY = token;
                    process.env.SECRET = token;
                    user_1.default.update({ token: token }, { where: { email: user.email } });
                    return res.status(200).json({
                        error: false,
                        data: token
                    });
                }
                else {
                    return res.status(400).json({
                        error: true,
                        data: 'Senha inválida.'
                    });
                }
            }
            catch (e) {
                console.log('Erro na validação de um usuário. Log:' + e);
                return res.status(500).json({
                    error: true,
                    data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
                });
            }
        });
    }
    init(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const randomString = crypto_1.default.randomBytes(20).toString('hex');
            yield user_1.default.create({
                name: 'Administrador da Uaubox',
                email: 'administrador@uaubox.com.br',
                password: '123456'
            }).then(user => {
                UserInfo_1.default.create({
                    cpf: '25304359011',
                    birthdate: '2010-01-01',
                    phone: '11947852134',
                    address: 'R. São Marinho Gonçalves, 514 Sorocaba SP',
                    UserInfo_id: user.id
                });
                const token = jsonwebtoken_1.default.sign({ user_id: user.id, email: user.email, name: user.name }, randomString, {
                    expiresIn: '5h'
                });
                user_1.default.update({ token: token }, { where: { email: user.email } });
            });
            return res.status(200).json({
                error: false,
                data: 'Usuário criado com sucesso!'
            });
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map