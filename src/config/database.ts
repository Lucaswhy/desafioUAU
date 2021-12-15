import { Sequelize } from 'sequelize'
// Setando configurações do postgre
const database = new Sequelize({
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
})

export function startDatabase () {
  try {
    database.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database: ', error)
  }
  try {
    // Criando caso não haja no banco todas as tabelas(que vem das models)
    database.sync()
  } catch (error) {
    console.error('Unable to sync with models: ', error)
  }
}

export default database
