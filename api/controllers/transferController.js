const Transfer = require("../models/TransferModel");

exports.getAllTransfers = async (req, res) => {
    try {
        const transfers = await Transfer.find();

        res.send(transfers);
    } catch (e) {
        res.status(404); // Internal server error
    }
}

exports.getTransfer = async (req, res) => {
    try {
        const { id } = req.params;

        const transfer = await Transfer.findById(id);

        res.send(transfer);
    } catch (e) {
        res.status(404); // Internal server error
    }
}