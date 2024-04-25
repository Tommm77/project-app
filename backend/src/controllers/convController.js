const convModel = require('../models/convModel');

exports.getAllConvs = async (req, res) => {
    try {
        const convs = await convModel.find();
        res.status(200).json(convs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getConvById = async (req, res) => {
    const { id } = req.params;

    try {
        const conv = await convModel.findById(id);
        res.status(200).json(conv);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createConv = async (req, res) => {
    const { name, members, admins } = req.body;

    try {
        const newConv = await convModel.create({ name, members, admins });
        res.status(201).json(newConv);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateConv = async (req, res) => {
    const { id } = req.params;
    const { name, members, admins } = req.body;

    try {
        const updatedConv = await convModel.findByIdAndUpdate(id, { name, members, admins }, { new: true });
        res.status(200).json(updatedConv);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteConv = async (req, res) => {
    const { id } = req.params;

    try {
        await convModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Conv deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
