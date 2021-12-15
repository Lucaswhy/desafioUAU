import express from 'express'

import UserController from '../controller/UserController'

const route = express.Router()

// Todas as rotas que ligam a controller e sua determinada API

route.get('/api/user/', UserController.select)

route.get('/api/user/:id', UserController.selectOne)

route.post('/api/user/', UserController.create)

route.delete('/api/user/:email', UserController.softDelete)

route.post('/validate', UserController.validate)

export default route
