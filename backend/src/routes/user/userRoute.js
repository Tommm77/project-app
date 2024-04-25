const expressRouter = require('express').Router(),
    userController = require('../../controllers/userController');
const {checkIsAuth} = require("../../config/passport");

module.exports = (app) => {
    expressRouter.get('/users',checkIsAuth, userController.getAllUsers)
    expressRouter.get('/user/:id',checkIsAuth, userController.getUserById)
    expressRouter.post('/user',checkIsAuth, userController.createUser)
    expressRouter.patch('/user/:id',checkIsAuth, userController.updateUser)
    expressRouter.delete('/user/:id',checkIsAuth, userController.deleteUser)
    app.use('/api/v1', expressRouter)
}