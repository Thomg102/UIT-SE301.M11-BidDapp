const User = require("../models/UserModel");

exports.addUser = async (req, res) => {
    try {
        const { key } = req.body;

        const user = await User.findOne({key: key});

        if (user === null) {
            const newUser = new User({ key: key });

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