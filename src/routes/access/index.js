const express = require("express")
const UserController = require("../../controllers/user.controller")
const route = express.Router()

route.post("/user/signup", UserController.signUp)
route.post("/user/signin", UserController.signIn)

module.exports = route