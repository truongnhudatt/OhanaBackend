const UserService = require("../services/user.service");

class UserController {
    static signUp = async (req, res, next) => {
        try {
            console.log("[USER] REGISTER:: ", req.body);
            return res.status(201).json(await UserService.signUp(req.body))
        } catch (error) {
            next(error);
        }
    }
    static signIn = async (req, res, next) => {
        try {
            console.log("[USER] LOGIN:: ", req.body);
            return res.status(200).json(await UserService.signIn(req.body))
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;