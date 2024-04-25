const expressRouter = require('express').Router(),
    userController = require('../../controllers/userController');

module.exports = (app) => {
    expressRouter.get('/users', userController.getAllUsers)
    expressRouter.get('/user/:id', userController.getUserById)
    expressRouter.post('/user', userController.createUser)
    expressRouter.patch('/user/:id', userController.updateUser)
    expressRouter.delete('/user/:id', userController.deleteUser)
    app.use('/api/v1', expressRouter)
}