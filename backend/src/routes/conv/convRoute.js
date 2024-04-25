const expressRouter = require('express').Router(),
    convController = require('../../controllers/convController');

module.exports = (app) => {
    expressRouter.get('/users', convController.getAllConvs)
    expressRouter.get('/user/:id', convController.getConvById)
    expressRouter.post('/user', convController.createConv)
    expressRouter.patch('/user/:id', convController.updateConv)
    expressRouter.delete('/user/:id', convController.deleteConv)
    app.use('/api/v1', expressRouter)
}