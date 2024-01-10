const axios = require("axios")
const {
    successReturnHandler,
    errorReturnHandler,
} = require("../general/httpResponseHandler");

const coinGeckoEndPoints = {
    coins: `${process.env.COIN_GECKO_ENDPOINT}/coins/markets?x_cg_api_key=${process.env.COIN_GECKO_KEY}&vs_currency=usd`
}

const getCoins = async () => {
    try {
        const response = await axios.get(coinGeckoEndPoints.coins).then((res) => {
            return res.data
        })

        if (response.length > 0) {
            const data = response
            return successReturnHandler("Success", data)
        } else return errorReturnHandler("Failed")
    }
    catch (error) {
        return errorReturnHandler("Failed", error)
    }
}

module.exports = {
    getCoins
}