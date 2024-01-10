const sequelize = require("../../../sequalize")
const { Op } = require("sequelize")

const { crypto_currencies: cryptoCurrencies } = sequelize.models
const cryptoCurrenyModel = cryptoCurrencies

const create = async (data) => {
    try {
        data.forEach(async (d) => {
            await cryptoCurrenyModel
                .create({
                    currency_id: d.id,
                    name: d.name,
                    price: d.current_price
                })
        });
    } catch (error) {
        return error
    }
}

const checkAndUpdate = async (data) => {
    try {
        data.forEach(async (d) => {
            await cryptoCurrenyModel
                .update({
                    currency_id: d.id,
                    name: d.name,
                    price: d.current_price
                }, {
                    where: {
                        currency_id: d.id,
                        price: {
                            [Op.ne]: d.current_price
                        }
                    }
                }).then((data) => {
                    console.log("updated data", data)
                    // emit socket here...
                })
        });
    } catch (error) {
        // console.log("Currency create is Failed", error);
    }
}

module.exports = {
    create,
    checkAndUpdate
}