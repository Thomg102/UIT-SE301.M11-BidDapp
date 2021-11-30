const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.addUser);

router
  .route("/:address")
  .get(userController.getUser)
  .put(userController.updateUser);
  
module.exports = router;