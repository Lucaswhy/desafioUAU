import Sequelize, { Model } from 'sequelize'
import database from '../config/database'

class UserInfo extends Model {
  public UserInfo_id!: number
  public cpf!: string
  public birthdate!: Date
  public phone!: string
  public address!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

UserInfo.init({
  cpf: {
    type: Sequelize.STRING,
    unique: true
  },
  birthdate: Sequelize.DATE,
  phone: Sequelize.STRING
}, { sequelize: database })

export default UserInfo
