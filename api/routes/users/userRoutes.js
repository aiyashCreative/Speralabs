const express = require('express')
const router = express.Router()
const autherization = require("../../middlwares/auth/userAutherization")

const userServices = require("../../services/users/userServices")

module.exports = () => {
    router.post("/login", userServices.login)
    router.post("/register", userServices.register)
    router.put("/update/:id", autherization, userServices.update)
    router.delete("/delete/:id", autherization, userServices.deleteUser)
    return router;
}