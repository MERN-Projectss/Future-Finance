const express = require("express")
const route = express.Router()

const {regUser, getUser, totalPrice} = require("../controller/userController")

route.post("/regUser",regUser)
route.get("/getUser",getUser)
route.get("/totalPrice", totalPrice)
module.exports = route