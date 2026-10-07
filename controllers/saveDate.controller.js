const SavedDateModel = require("../models/savedDate.models");

const createSavedDate = async (request, respond) => {
    try {
        const { date, note, weather } = request.body

        if (!date) {
            respond.status(400).send({
                message: "Date is required"
            })
            return;
        }

        const savedDate = await SavedDateModel.create({
            user: request.user.id,
            date,
            note,
            weather
        });

        respond.status(201).send({
            message: "Date successfully saved",
            data: savedDate

        });

    } catch (error) {
        console.log(error)
        if (error.code == 11000) {
            respond.status(400).send({
                message: "Date already saved"
            })
            return
        };

        respond.status(500).send({
            message: "Something went wrong"
        })

    }
};

const getSavedDates = async (request, respond) => {
    try {
        const savedDates = await SavedDateModel.find({ user: request.user.id }).sort({ date: 1 })

        respond.status(200).send({
            message: "Saved dates fetched successfully",
            count: savedDates.length,
            data: savedDates
        })

    } catch (error) {
        console.log(error)
        respond.status(500).send({
            message: "Something went wrong"
        })
    }
}

const updateSavedDate = async (request, respond) => {
    try {
        const { note } = request.body
        if (!note) {
            respond.status(400).send({
                message: "Note is required"
            })
            return
        }
        const updateDates = await SavedDateModel.findOneAndUpdate(
            { _id: request.params.id, user: request.user.id },
            { note },
            { new: true }
        )

        if (!updateDates) {
            return respond.status(404).send({
                message: "Saved date not found"
            })
        }

        respond.status(200).send({
            message: "Note successfully updated",
            data: updateDates
        })

    } catch (error) {
        console.log(error)
        respond.status(500).send({ message: "Something went wrong" })
    }
};

const deleteSavedDate = async (request, respond) => {
    try {
        const deleted = await SavedDateModel.findOneAndDelete({
            _id: request.params.id,
            user: request.user.id
        })

        if (!deleted) {
            return respond.status(404).send({
                message: "Saved date not found"
            })
            return
        }

        respond.status(200).send({
            message: "Note successfully deleted",
            data: deleted
        })


    } catch (error) {
        console.log(error)
        respond.status(500).send({ message: "Something went wrong" })
    }
};


module.exports = { createSavedDate, getSavedDates, updateSavedDate, deleteSavedDate }