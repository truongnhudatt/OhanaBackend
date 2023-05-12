
const bcrypt = require("bcrypt")
const User = require("../models/user.model")

class UserService {
    static signUp = async ({ firstName, lastName, email, password, mobile }) => {
        try {
            const holderUser = await User.findOne({ email }).lean()
            if (holderUser) {
                return {
                    code: 'xxx',
                    message: "User already exist.!!"
                }
            }
            const passwordHased = await bcrypt.hash(password, 10)
            console.log({ passwordHased });
            const newUser = new User({ firstName, lastName, password: passwordHased, email, mobile })
            await newUser.save()
            // const newUser = await userModel.create({name, password: passwordHased, email, mobile})
            console.log(newUser);
            if (!newUser) {
                return {
                    code: 'xxx',
                    message: "Cannot create this user because i dont know reason"
                }
            }
            const accessToken = newUser.generateAccessToken();
            const refreshToken = newUser.generateRefreshToken();
            return {
                code: 201,
                metadata: newUser,
                accessToken,
                refreshToken
            }

        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = UserService