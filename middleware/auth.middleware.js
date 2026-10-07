const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const verifyUser = (request, respond, next) => {

    try {
        const verifyHeader = request.headers.authorization

        if (!verifyHeader || !verifyHeader.startsWith("Bearer ")) {
            return respond.status(401).send({ 
            message: "No token provided" })
        }

        const token = verifyHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        request.user = decoded
        next()

    } catch (error) {
        console.log(error)
        respond.status(401).send({ message: "Not authorized" })
    }
}

module.exports = verifyUser