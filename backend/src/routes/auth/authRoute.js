const expressRouter = require('express').Router(),
    authController = require('../../controllers/authController');

module.exports = (app) => {
    // app.get('/users', userController.getAll)
    expressRouter.post('/login', authController.login)
    expressRouter.post('/registration', authController.signUp)
    app.use('/api/v1', expressRouter)
}