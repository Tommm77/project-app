const expressRouter = require('express').Router(),
    messageController = require('../../controllers/messageController');
const {checkIsAuth} = require("../../config/passport");

module.exports = (app) => {
    expressRouter.get('/messages',checkIsAuth, messageController.getAllMessages)
    expressRouter.get('/message/:id',checkIsAuth, messageController.getMessageById)
    expressRouter.post('/message',checkIsAuth, messageController.createMessage)
    expressRouter.patch('/message/:id',checkIsAuth, messageController.updateMessage)
    expressRouter.delete('/message/:id',checkIsAuth, messageController.deleteMessage)
    app.use('/api/v1', expressRouter)
}