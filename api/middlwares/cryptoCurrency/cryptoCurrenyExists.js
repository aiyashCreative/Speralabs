const sequelize = require('../../../sequalize')
const { crypto_currencies: cryptoCurrencies, } = sequelize.models
const cryptoCurrencyModel = cryptoCurrencies

const cryptoCurrencyExists = async () => {
    const cryptoCurrencies = await cryptoCurrencyModel.findAndCountAll()
    if(cryptoCurrencies.count > 0) return true
    else return false
}

module.exports = {
    cryptoCurrencyExists
}