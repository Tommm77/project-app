const expressRouter = require('express').Router(),
    messageController = require('../../controllers/messageController');

module.exports = (app) => {
    expressRouter.get('/messages', messageController.getAllMessages)
    expressRouter.get('/message/:id', messageController.getMessageById)
    expressRouter.post('/message', messageController.createMessage)
    expressRouter.patch('/message/:id', messageController.updateMessage)
    expressRouter.delete('/message/:id', messageController.deleteMessage)
    app.use('/api/v1', expressRouter)
}