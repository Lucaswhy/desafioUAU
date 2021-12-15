import { Router } from 'express'
import verifyToken from './token'
import user from '../API/user'

const routes = Router()

// Encaminhando as rotas para a API onde será ligada a controller
routes.use('/', user)

routes.get('/status', verifyToken, (req, res) => {
  res.json({
    error: false,
    message: 'Server is working normally.'
  })
})

// Qualquer URL digitada que não condiz com nada do Back será encaminhado para ser tratada no index do React
routes.get('*', function (req, res) {
  res.render('index')
})

export default routes
