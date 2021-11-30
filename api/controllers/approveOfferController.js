const ApproveOffer = require("../models/ApproveOfferModel");

exports.getAllApproveOffers = async (req, res) => {
    try {
        const approveOffers = await ApproveOffer.find();

        res.send(approveOffers);
    } catch (e) {
        res.status(404); // Internal server error
    }
}

exports.getApproveOffer = async (req, res) => {
    try {
        const { id } = req.params;

        const approveOffer = await ApproveOffer.findById(id);

        res.send(approveOffer);
    } catch (e) {
        res.status(404); // Internal server error
    }
}