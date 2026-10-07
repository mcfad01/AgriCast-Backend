const UserModel = require("../models/user.models")

const getProfile = async (request, respond) => {
    try {
        const user = await UserModel.findById(request.user.id)

        if (!user) {
            respond.status(404).send({
                message: "User not found"

            }); return
        }

        respond.status(200).send({

            message: "User fetched",
            data: {
                fullname: user.fullname,
                email: user.email,
                farmLocation: user.farmLocation
            }

        });

    } catch (error) {
        console.log(error);
        respond.status(500).send({
            message: "Something went wrong"
        });
    }

}

const updateLocation = async (request, respond) => {
    try {
        const { city, latitude, longitude } = request.body
        const user = await UserModel.findById(request.user.id)

        if (!user) {
            respond.status(404).send({
                message: "User not found"
            }); return
        }

        user.farmLocation.city = city
        user.farmLocation.latitude = latitude
        user.farmLocation.longitude = longitude
        await user.save()


        respond.status(200).send({
            message: "Farm location updated successfully",
            data: user.farmLocation
            
        })


    } catch (error) {
        console.log(error);
        respond.status(500).send({
            message: "Something went wrong"
        });
    }
}


module.exports = { getProfile, updateLocation }