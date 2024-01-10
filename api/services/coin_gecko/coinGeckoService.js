const coinGeckoController = require("../../controllers/coin_gecko/coinGeckoController")
const cryptoCurrencyController = require("../../controllers/cryptoCurrency/cryptoCurrencyController")

const getAll = async () => {
    try {
        return await coinGeckoController
            .getCoins()
            .then((response) => {
                if (response.result) {
                    cryptoCurrencyController.create(response.data)
                } else {
                    console.log(response)
                }
            })
            .catch((error) => {
                console.log(error)
            });
    } catch (error) {
        console.log(error)
    }
};

const checkAndUpdatePrice = async () => {
    try {
        return await coinGeckoController
            .getCoins()
            .then((response) => {
                if (response.result) {
                    cryptoCurrencyController.checkAndUpdate(response.data)
                } else {
                    console.log(response)
                }
            })
            .catch((error) => {
                console.log(error)
            });
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    getAll,
    checkAndUpdatePrice
}