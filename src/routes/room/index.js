const express = require("express")
const route = express.Router()
const verifyToken = require("../../middlewares/checkAuth")
const upload = require("../../utils/prePhoto")
const RoomController = require("../../controllers/room.controller")

route.post("/rooms/create",verifyToken,upload.array("photos"), RoomController.createRoom)
route.get("/rooms/nearby",verifyToken, RoomController.nearby)
route.get("/rooms/find", RoomController.findAll)


module.exports = route