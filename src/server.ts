import express, { NextFunction, Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import { startDatabase } from './config/database'
import routes from './shared/index'

const app = express()

app.use(express.static(path.join('../public')))
app.set('views', path.join('../public'))

// Chamando a database e inicilizando as tabelas
startDatabase()

app.use(express.json({}))
app.use(express.urlencoded({ extended: false }))

// Setando engine view, EJS para funcionar com o react no public depois.
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)

// Um middleware para caso seja necessário na utilização do Token
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', '*')

  app.use(cors())
  next()
})

app.use(routes)

const PORT = 8084
app.listen(PORT, () => {
  console.log('Server up.')
})
