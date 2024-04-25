const expressRouter = require('express').Router(),
    convController = require('../../controllers/convController');
const {checkIsAuth} = require("../../config/passport");

module.exports = (app) => {
    expressRouter.get('/convs',checkIsAuth, convController.getAllConvs)
    expressRouter.get('/conv/:id',checkIsAuth, convController.getConvById)
    expressRouter.post('/conv',checkIsAuth, convController.createConv)
    expressRouter.patch('/conv/:id',checkIsAuth, convController.updateConv)
    expressRouter.delete('/conv/:id',checkIsAuth, convController.deleteConv)
    expressRouter.get('/conv/user/:userId',checkIsAuth, convController.getConvByUser)
    app.use('/api/v1', expressRouter)
}