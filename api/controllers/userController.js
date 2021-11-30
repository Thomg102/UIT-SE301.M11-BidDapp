const User = require("../models/UserModel");

exports.addUser = async (req, res) => {
    try {
        const { address } = req.body;

        const user = await User.findOne({address: address});

        if (user === null) {
            const newUser = new User({ address: address });

            await newUser.save();

            res.status(201).send(newUser); // created successfully
        }

        if (user !== null) {
            res.send({});
        }
    } catch (e) {
        res.status(500).json({message: "server fail"}); // Internal server error
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.send(users);
    } catch (e) {
        res.status(404); // Internal server error
    }
}

exports.getUser = async (req, res) => {
    try {
        const { address } = req.params;

        const user = await User.find({ address: address });

        res.send(user);
    } catch (e) {
        res.status(404); // Internal server error
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { address } = req.params;
        const { name } = req.body;

        const updatedUser = await User.findOneAndUpdate({address: address}, {name: name});

        res.status(200).send(updatedUser); // update successfully
    } catch (e) {
        res.status(500).json({message: "server fail"}); // Internal server error
    }
}