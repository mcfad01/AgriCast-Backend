const UserModel = require("../models/user.models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()


const registerUser = async (request, respond) => {
    try {
        const { fullname, email, password } = request.body
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await UserModel({ fullname, email, password: hashPassword }).save()

        if(!password ){
            respond.status(400).send({
                message: "Kindly fill the empty field"
            })
        }

        respond.status(201).send({
            message: "User registered successfully",

            data: {
                fullname,
                email,
            }
        })
    } catch (error) {
        console.log(error);
        if (error.code == 11000) {
            respond.status(400).send({
                message: "Account already exist"
            })

        } else {
            respond.status(400).send({
                message: "User cannot be created at this time"
            })
        }

    }
};


const loginUser = async (request, respond) => {
    try {
        const { email, password } = request.body
        const isUser = await UserModel.findOne({ email }).select("+password")

        if (!isUser) {
            respond.status(400).send({
                message: "Invalid Credentials"
            })
            return
        }

        const isMatch = await bcrypt.compare(password, isUser.password)

        if (!isMatch) {
            respond.status(400).send({
                message: "Invalid Credentials"
            })
            return
        }

        const token = jwt.sign(
            { id: isUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d", algorithm:"HS256" }
        )

        respond.status(200).send({
            message: "User login successful",

            data: {
                email: isUser.email,
                token
            }
        })


    } catch (error) {
        console.log(error);
        respond.status(400).send({
            message: "Invalid credentials"
        })
    }
}

module.exports = {
    registerUser,
    loginUser
};