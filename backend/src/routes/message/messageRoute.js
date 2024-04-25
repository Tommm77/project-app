const expressRouter = require('express').Router(),
    messageController = require('../../controllers/messageController');

module.exports = (app) => {
    expressRouter.get('/users', messageController.getAllMessages)
    expressRouter.get('/user/:id', messageController.getMessageById)
    expressRouter.post('/user', messageController.createMessage)
    expressRouter.patch('/user/:id', messageController.updateMessage)
    expressRouter.delete('/user/:id', messageController.deleteMessage)
    app.use('/api/v1', expressRouter)
}