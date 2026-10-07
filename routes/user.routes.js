const express = require("express")
const router = express.Router()
const { registerUser, loginUser } = require("../controllers/user.controller")
const { getProfile, updateLocation, } = require("../controllers/profile.controller")
const verifyUser = require("../middleware/auth.middleware")
const { createSavedDate, getSavedDates, updateSavedDate, deleteSavedDate } = require("../controllers/saveDate.controller")



router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", verifyUser, getProfile)
router.put("/location", verifyUser, updateLocation)
router.post("/saved-date", verifyUser, createSavedDate )
router.get("/saved-dates", verifyUser, getSavedDates )
router.patch("/saved-dates/:id", verifyUser, updateSavedDate )
router.delete("/saved-dates/:id", verifyUser, deleteSavedDate )



module.exports = router