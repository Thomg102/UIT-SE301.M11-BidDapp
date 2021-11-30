const NewOffer = require("../models/NewOfferModel");

exports.getAllNewOffers = async (req, res) => {
    try {
        const newOffers = await NewOffer.find();

        res.send(newOffers);
    } catch (e) {
        res.status(404); // Internal server error
    }
}

exports.getNewOffer = async (req, res) => {
    try {
        const { id } = req.params;

        const newOffer = await NewOffer.findById(id);

        res.send(newOffer);
    } catch (e) {
        res.status(404); // Internal server error
    }
}