const expressRouter = require('express').Router(),
    convController = require('../../controllers/convController');

module.exports = (app) => {
    expressRouter.get('/convs', convController.getAllConvs)
    expressRouter.get('/conv/:id', convController.getConvById)
    expressRouter.post('/conv', convController.createConv)
    expressRouter.patch('/conv/:id', convController.updateConv)
    expressRouter.delete('/conv/:id', convController.deleteConv)
    app.use('/api/v1', expressRouter)
}