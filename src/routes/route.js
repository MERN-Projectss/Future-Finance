const express = require("express")
const route = express.Router()

const {regUser, getUser, getReward} = require("../controller/userController")

route.post("/regUser",regUser)
route.get("/getUser",getUser)
route.get("/getReward", getReward)
module.exports = route