import Sequelize, { Model } from 'sequelize'
import database from '../config/database'
import UserInfo from './UserInfo'

class User extends Model {
  public id!: number
  public name!: string
  public email!: string
  public password!: string
  public active!: boolean
  public token!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}
// Definindo os atributos + o id como auto increment
User.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: Sequelize.STRING,
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  token: Sequelize.STRING
}, { sequelize: database })
// Setando que a tabela composta UserInf pertencerá a model esse arquivo User
User.hasOne(UserInfo, { foreignKey: 'UserInfo_id' })

export default User
