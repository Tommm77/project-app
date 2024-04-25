const messageModel = require('../models/messageModel');

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
    const { content, sender, receiver } = req.body;

    try {
        const newMessage = await messageModel.create({ content, sender, receiver });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateMessage = async (req, res) => {
    const { id } = req.params;
    const { content, sender, receiver } = req.body;

    try {
        const updatedMessage = await messageModel.findByIdAndUpdate(id, { content, sender, receiver }, { new: true });
        res.status(200).json(updatedMessage);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteMessage = async (req, res) => {
    const { id } = req.params;

    try {
        await messageModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Message deleted successfully' });
    }

    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

