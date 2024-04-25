const convModel = require('../models/convModel');
const messageModel =  require('../models/messageModel');
exports.getAllConvs = async (req, res) => {
    try {
        // Populate également les utilisateurs et messages pour une vue complète
        const convs = await convModel.find().populate('admins members');
        res.status(200).json(convs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getConvById = async (req, res) => {
    const { id } = req.params;

    try {
        // Populate les champs pour obtenir les détails complets
        const conv = await convModel.findById(id).populate('admins members');
        if (!conv) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.status(200).json(conv);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getConvByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Trouver les conversations où l'utilisateur est membre ou admin
        const convs = await convModel.find({ $or: [{ members: userId }, { admins: userId }] }).populate('admins members');

        // Pour chaque conversation, trouver les messages liés
        const convsWithMessages = await Promise.all(convs.map(async (conv) => {
            const messages = await messageModel.find({ receiver: conv._id }).populate('sender');
            return {
                ...conv.toObject(),
                messages: messages
            };
        }));

        res.status(200).json(convsWithMessages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// exports.getConvByUser = async (req, res) => {
//     const { userId } = req.params;

//     try {
//         const convs = await convModel.find({ $or: [{ members: userId }, { admins: userId }] }).populate('admins members');
//         res.status(200).json(convs);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }

// }

exports.createConv = async (req, res) => {
    const { name, members, admins } = req.body;

    try {
        const newConv = await convModel.create({ name, members, admins });
        res.status(201).json(newConv);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateConv = async (req, res) => {
    const { id } = req.params;
    const { name, members, admins } = req.body;

    try {
        const updatedConv = await convModel.findByIdAndUpdate(id, { name, members, admins }, { new: true }).populate('admins members');
        res.status(200).json(updatedConv);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteConv = async (req, res) => {
    const { id } = req.params;

    try {
        await convModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Conversation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
