const messageModel = require('../models/messageModel');
const userModel = require('../models/userModel');

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await messageModel.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getMessageById = async (req, res) => {
    const { id } = req.params;

    try {
        const message = await messageModel.findById(id);
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createMessage = async (req, res) => {
    let { content, sender, receiver } = req.body;

    try {
        const user = await userModel.findById(sender[0]).exec();

        if (!user) {
            return res.status(404).json({ message: "Receiver not found." });
        }

        const newMessage = await messageModel.create({ content, receiver, sender });

        global.io.emit('messageCreated', {
            content: newMessage.content,
            sender: user,
            receiver: newMessage.receiver,
        });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateMessage = async (req, res) => {
    const { id } = req.params;
    const { content, sender, isRead, receiver } = req.body;

    try {
        const updatedMessage = await messageModel.findByIdAndUpdate(id, { content, sender, isRead, receiver }, { new: true });

        global.io.emit('messageUpdated', updatedMessage);

        res.status(200).json(updatedMessage);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteMessage = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const message = await messageModel.findById(id);

        if (!message) {
            return res.status(404).json({ message: "Message not found." });
        }

        if (message.sender.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this message." });
        }

        await messageModel.findByIdAndDelete(id);
        global.io.emit('messageDeleted', { messageId: id });
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


