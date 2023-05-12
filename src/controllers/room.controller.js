const RoomService = require("../services/room.service");

class RoomController{
    static createRoom = async(req, res, next) =>{
        try {
            console.log(`[ROOM] CREATE :: `, {data: req.body,files: req.files.map((file) => file.filename)});
            return res.status(201).json(await RoomService.createRoom(req.body, req.files.map((file) => file.filename), req.user._id));
        } catch (error) {
            next(error);
        }
    }
    static nearby = async(req, res, next) => {
        try {
            console.log(`[ROOM] NEARBY:: `, req.query);
            return res.status(200).json(await RoomService.nearby(req.query))
        } catch (error) {
            next(error)
        }
    }
    static findAll = async(req, res, next) => {
        try {
            console.log(`[ROOM] GET ALL:: `, req.query);
            return res.status(200).json(await RoomService.findAll(req.query))
        } catch (error) {
            next(error)
        }
    }
}


module.exports = RoomController