const express = require('express')
const router = express.Router()
const autherization = require("../../middlwares/auth/userAutherization")

const cryptoCurrencyUserService = require("../../services/cryptoCurrencyUser/cryptoCurrencyUserService")

module.exports = () => {
    router.post("/create/:id", autherization, cryptoCurrencyUserService.create)
    router.put("/update/:id", autherization, cryptoCurrencyUserService.update)
    router.delete("/delete/:id", autherization, cryptoCurrencyUserService.delete)
    return router;
}