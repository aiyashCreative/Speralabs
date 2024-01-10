const express = require('express')
const { cryptoCurrencyExists } = require("../../middlwares/cryptoCurrency/cryptoCurrenyExists")

const coinGeckoServices = require("../../services/coin_gecko/coinGeckoService")

const getCoinGecko = async () => {
    const isAvailable = await cryptoCurrencyExists()
    if (!isAvailable) await coinGeckoServices.getAll()
}

const checkPriceAndUpdate = async () => {
    await coinGeckoServices.checkAndUpdatePrice()
}

module.exports = {
    getCoinGecko,
    checkPriceAndUpdate
}