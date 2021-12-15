import { Request, Response } from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import User from '../model/user'
import UserInfo from '../model/UserInfo'
import { config } from 'process'

// Criando a classe na qual será inicializada no typescript para enviar pro end-point
class UserEndpoint {
  constructor (
    public name: string | undefined,
    public email: string | undefined,
    public cpf: string | undefined,
    public birthdate: Date | undefined,
    public phone: string | undefined,
    public address: string | undefined
  ) {}
}

// CHAMADA PARA CRIAÇÃO DO POST {
//     "data": {
//         "name": "Lucas Herculano",
//         "email": "lucas@teste.com",
//         "password": "1234",
//         "cpf": "1",
//         "birthdate": "2021/01/01",
//         "phone": "1",
//         "address": "Rua Mairinque"
//     }
// }

class UserController {
  public async select (req: Request, res: Response): Promise<Response> {
    const users = await User.findAll({ where: { active: true } })
    try {
      if (users.length > 0) {
        return (res.status(200).json({
          error: false,
          data: users
        }))
      } else {
        return (res.status(204).json({
          error: true,
          data: 'Não há nenhum usuário cadastrado no sistema.'
        }))
      }
    } catch (e) {
      console.log('Erro no index do User. log:' + e)
      return (res.status(500).json({
        error: true,
        data: 'Houve um erro no sistema. Por favor tente novamente mais tarde.'
      }))
    }
  }

  public async selectOne (req: Request, res: Response): Promise<Response> {
    // Verificação da possibilidade de ter parâmetrs não numéricos
    const idParams = isNaN(parseInt(req.params.id)) ? undefined : parseInt(req.params.id)
    const userInfo = await UserInfo.findByPk(idParams)
    if (userInfo === null) return (res.status(404).json({ error: true, data: 'Esse usuário não existe no sistema.' }))
    const user = await User.findOne({ where: { active: true, id: userInfo?.UserInfo_id } })
    if (user === null) return (res.status(404).json({ error: true, data: 'Esse usuário não existe no sistema.' }))

    else {
      // Criando o usuário de end-point para o envio
      const userEndpoint = new UserEndpoint(user?.name, user?.email, userInfo?.cpf, userInfo?.birthdate, userInfo?.phone, userInfo?.address)
      return (res.status(200).json({
        error: false,
        data: userEndpoint
      }))
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    if (req.body.data == null) return res.status(204).json({ error: true, data: 'Nenhum dado informado' })
    try {
      await User.findOne({ where: { email: req.body.data.email } }).then((user: User | null) => {
        if (user) {
          return res.status(208).json({ error: true, data: 'E-mail já cadastrado.' })
        }
      })
      await UserInfo.findOne({ where: { cpf: req.body.data.cpf } }).then((user: UserInfo | null) => {
        if (user) {
          return res.status(208).json({ error: true, data: 'CPF já cadastrado.' })
        }
      })
      // Gerando string aleatória para o Token
      const randomString : any = crypto.randomBytes(20).toString('hex')

      await User.create({
        name: req.body.data.name,
        email: req.body.data.email,
        password: req.body.data.password
      }).then(user => {
        UserInfo.create({
          cpf: req.body.data.cpf,
          birthdate: req.body.data.birthdate,
          phone: req.body.data.phone,
          address: req.body.data.address,
          UserInfo_id: user.id
        })
        // Criando o token
        const token = jwt.sign(
          { user_id: user.id, email: user.email, name: user.name },
          randomString,
          {
            expiresIn: '5h'
          }
        )
        User.update({ token: token }, { where: { email: user.email } })
      })

      return res.status(200).json({
        error: false,
        data: 'Usuário criado com sucesso!'
      })
    } catch (e) {
      console.log('Erro na criação de um usuário. Log:' + e)
      return res.status(500).json({
        error: true,
        data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
      })
    }
  }

  public async softDelete (req: Request, res: Response): Promise<Response> {
    const idParams : Number | undefined = isNaN(parseInt(req.params.id)) ? undefined : parseInt(req.params.id)
    try {
      // Como é um soft delete, estou apenas desativando o registro do banco.
      await User.update({ active: false }, { where: { email: req.params.email } })
      return res.status(200).json({
        error: false,
        data: 'Usuário deletado com sucesso.'
      })
    } catch (e) {
      console.log('Erro no delete de um usuário. Log:' + e)
      return res.status(500).json({
        error: true,
        data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
      })
    }
  }

  public async validate (req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      if (!(email && password)) {
        return res.status(400).json({
          error: true,
          data: 'É preciso informar o e-mail ou a senha.'
        })
      }

      const user = await User.findOne({ where: { active: true, email: email } })

      if (user === null || user === undefined) {
        return res.status(400).json({
          error: true,
          data: 'Seu e-mail não existe ou foi desativado, por favor, contate um administrador.'
        })
      }
      if (user.password === password.toString()) {
        const randomString : any = crypto.randomBytes(20).toString('hex')
        const token = jwt.sign(
          { user_id: user.id, email: user.email, name: user.name },
          randomString,
          {
            expiresIn: '5h'
          }
        )
        // Setando o token no process env e o secret.
        process.env.TOKEN_KEY = token
        process.env.SECRET = token
        // Atualizando o Token após o login.
        User.update({ token: token }, { where: { email: user.email } })
        return res.status(200).json({
          error: false,
          data: token
        })
      } else {
        return res.status(400).json({
          error: true,
          data: 'Senha inválida.'
        })
      }
    } catch (e) {
      console.log('Erro na validação de um usuário. Log:' + e)
      return res.status(500).json({
        error: true,
        data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
      })
    }
  }
}

export default new UserController()
